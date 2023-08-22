import os
import cv2
import time
import numpy as np
import mediapipe as mp
import suspicion_tracker as st
from gaze_tracking import GazeTracking

class HeadPoseEstimation():

    # Threshold_X for looking up and down, Threshhold_Y for looking left and right
    def __init__(self, source, output, threshold_x=5, threshold_y=5):

        """ Initializing parameters, source, output_path and 
        mediapipe components for Face Landmark detection
        """

        self.cap = cv2.VideoCapture(source)
        self.dst = output
        self.size = (640, 480)
        self.is_gazed = False
        self.threshold_x = threshold_x
        self.threshold_y = threshold_y

        # for VideoWriter
        self.out = None

        # Suspicion Tracker
        self.suspicion_tracker = st.SuspicionTracker(decay_factor=0.99995)

        # Gaze tracking
        self.gaze_tracker = GazeTracking()

        # initializing Mediapipe components
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(min_detection_confidence=0.5,
                                                    min_tracking_confidence=0.5)
        self.mp_drawing = mp.solutions.drawing_utils
        self.drawing_spec = self.mp_drawing.DrawingSpec(thickness=1, circle_radius=1,
                                                        color=(0, 255, 0))

    def _preprocess_frame(self, frame):

        """ Horizontally flipping the frame for a selfie view, also 
        converting the color from BGR to RGB """
        frame = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
        
        """ Improving the performance by setting writable to False for 
            a read-only frame while getting the image processed results """
        frame.flags.writeable = False
        results = self.face_mesh.process(frame)
        frame.flags.writeable = True

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR) # converting the color space from RGB to BGR
        frame = cv2.resize(frame, self.size)

        """ Adding gaze tracking using dlib and shape predictor 68 face landmarks """
        self.gaze_tracker.refresh(frame)
        frame = self.gaze_tracker.annotated_frame()


        """ Creating 2d and 3d reference points for the landmarks 
            to determine head rotation """

        img_h, img_w, img_c = frame.shape
        face_3d = []
        face_2d = []

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                for idx, lm in enumerate(face_landmarks.landmark):
                    if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                        if idx == 1:
                            nose_2d = (lm.x * img_w, lm.y * img_h)
                            nose_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)

                        x, y = int(lm.x * img_w), int(lm.y * img_h)

                        """ Getting 2D and 3D Face Coordinates """
                        face_2d.append([x, y])
                        face_3d.append([x, y, lm.z])

                """ Converting the resulting coordinates to a numpy array"""
                face_2d = np.array(face_2d, dtype=np.float64)
                face_3d = np.array(face_3d, dtype=np.float64)

                focal_length = 1 * img_w
                
                """ Simplified calibration by getting the intrinsic and 
                    distortion parameters of the camera """
                cam_matrix = np.array([[focal_length, 0, img_h / 2],
                                    [0, focal_length, img_w / 2],
                                    [0, 0, 1]])
                
                dist_matrix = np.zeros((4, 1), dtype=np.float64) # Distortion parameters

                """ Solving PnP and getting only rotational matrix by using the rotation vector """
                success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)

                rmat, jac = cv2.Rodrigues(rot_vec)

                angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat) # getting angles

                """ Getting x, y, z and values and multiplying it to 360 """
                x = angles[0] * 360
                y = angles[1] * 360
                z = angles[2] * 360

                """ With a threshold 10 degrees, the script will determine whether the user is greater than or less than
                the threshold. The x and y variables corresponds to the axis. Such that if script detects negative threhold
                in y-axis, then the person is looking left.
                """

                threshold_x, threshold_y = self.threshold_x, self.threshold_y

                left_pupil = self.gaze_tracker.pupil_left_coords()
                right_pupil = self.gaze_tracker.pupil_right_coords()

                are_eyes_looking_center = self.gaze_tracker.is_center() and left_pupil and right_pupil is not None

                # Left or Right or Down or Up
                is_face_looking_center = not (y < -(threshold_y) or y > (threshold_y) or x < -(threshold_x) or x > (threshold_x))

                # For debugging
                # print("Eyes looking center:", are_eyes_looking_center)
                # print("Face looking center:", is_face_looking_center)

                if  is_face_looking_center and are_eyes_looking_center:  # checks if the eye is looking center
                    text = "Looking center"
                    self.is_gazed = False
                else:
                    text = "Looking away"
                    self.is_gazed = True

                # """ Displaying the nose direction """
                # nose_3d_projection, jacobian = cv2.projectPoints(nose_3d, rot_vec, trans_vec, cam_matrix, dist_matrix)

                """ Projecting a line pointing from the nose of the subject """
                p1 = (int(nose_2d[0]), int(nose_2d[1]))
                p2 = (int(nose_2d[0] + y * 10), int(nose_2d[1] - x * 10))

                cv2.line(frame, p1, p2, (255, 0, 0), 3)

                cv2.putText(frame, text, (20, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                cv2.putText(frame, "x: " + str(np.round(x, 2)), (20, 215), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0))
                cv2.putText(frame, "y: " + str(np.round(y, 2)), (20, 250), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0))
                cv2.putText(frame, "z: " + str(np.round(z, 2)), (20, 285), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0))

                if self.suspicion_tracker.get_suspicion_level() < 50:
                    cv2.putText(frame, f'Suspicion Level: {str(np.round(self.suspicion_tracker.get_suspicion_level(), 2))}%', (20, 450), cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, (0, 255, 0), 2)
                else:
                    cv2.putText(frame, f'Suspicion Level: {str(np.round(self.suspicion_tracker.get_suspicion_level(), 2))}%', (20, 450), cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, (0, 0, 255), 2)
                cv2.putText(frame, "Left pupil:  " + str(left_pupil), (20, 130), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 255, 0), 1)
                cv2.putText(frame, "Right pupil: " + str(right_pupil), (20, 165), cv2.FONT_HERSHEY_DUPLEX, 0.5, (0, 255, 0), 1)

                # Uncomment this to show face landmarks
                self.mp_drawing.draw_landmarks(
                    image=frame,
                    landmark_list=face_landmarks,
                    connections=self.mp_face_mesh.FACEMESH_CONTOURS,
                    landmark_drawing_spec=self.drawing_spec,
                    connection_drawing_spec=self.drawing_spec
                )

        return frame

    def preprocessed(self):

        """ Running landmarks detection in source video and 
        """

        current_time = 0
        gaze_timer_start = 0
        gaze_timer_prev = 0
        gaze_duration = 0

        counter = 0
        hasSaved = True

        while self.cap.isOpened():
            
            ret, frame = self.cap.read()
            
            if not ret:
                break
            
            start = time.time()
            frame = self._preprocess_frame(frame) # running facial landmark detection on each frame
            end = time.time()

            fps = 1 / (end - start) 
            # cv2.putText(frame, f'FPS: {int(fps)}', (20, 450), cv2.FONT_HERSHEY_SIMPLEX,
            #             1, (0, 255, 0), 2)
            
            # Start timer on gaze, stop on not gazing, calculate duration
            # gaze_timer_start = time.localtime(time.time()).tm_sec
            gaze_timer_start = int(time.time_ns() / 1000000000)
            current_time += gaze_timer_start - gaze_timer_prev

            # For saving the video
            if (self.out == None):
                print("Filepath:", f"{self.dst}\\clip-{counter}.avi")
                filepath = f"{self.dst}"
                os.makedirs(filepath, exist_ok=True)
                self.out = cv2.VideoWriter(os.path.join(filepath, f'clip-{counter}.avi'),
                                             cv2.VideoWriter_fourcc(*'MJPG'),
                                             15, self.size)
                
            # Records video when labeled as gazing
            if self.is_gazed:
                gaze_duration += gaze_timer_start - gaze_timer_prev
                if gaze_duration >= 3:
                    # print(f"gazing: {gaze_duration} seconds")                 
                    self.out.write(frame)
                    hasSaved = False
                    self.suspicion_tracker.trigger()

            else:
                if (hasSaved == False):
                    hasSaved = True

                    # Releases the video writer
                    print(f"Saving... clip-{counter}")
                    counter += 1
                    self.out.release()
                    self.out = None

                gaze_duration = 0
         
            cv2.imshow(f"Clip", frame)

            gaze_timer_prev = gaze_timer_start

            self.suspicion_tracker.update()

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        self.cap.release()
        if (self.out != None):
            self.out.release()
        cv2.destroyAllWindows()
        print("Preprocessing done!")

if __name__ == '__main__':
    
    # FILE_PATH = "src/gaze-tracker/tests/using-phone.mp4"
    FILE_PATH = 0
    # hp = HeadPoseEstimation(FILE_PATH, f"src\gaze-tracker\src\outputs\{FILE_PATH.split('/')[-1]}", 10, 5)
    hp = HeadPoseEstimation(FILE_PATH, f"src\gaze-tracker\src\outputs", 10, 5)
    hp.preprocessed()