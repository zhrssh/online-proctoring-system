from flask import Flask, request, jsonify
import head_pose as hp
import threading
import os

app = Flask(__name__)

# This is where video gets processed and cut into clips
def inference(path, output_path, threshold_x, threshold_y):
    head_pose = hp.HeadPoseEstimation(path, output_path, threshold_x, threshold_y)
    head_pose.preprocessed()

@app.route('/upload', methods=['POST'])
def upload_video():
    filename = ""
    path = ""
    for file in request.files:
        filename = request.files[file].filename
        path=f"src\\gaze-tracker\\src\\uploads\\{filename}"
        # os.makedirs(path, exist_ok=True)
        request.files[file].save(dst=path)

    # Using Threading library for multiple and faster requests
    # src/outputs/2023-08-16.avi/clips-2023-08-16-0.avi
    t1 = threading.Thread(target=inference, args=[path, f"src\\gaze-tracker\\src\\outputs\\{filename.split('.')[0]}", 10, 10])
    t1.start()
    return "Uploading"

if __name__ == '__main__':
    app.run(debug=True, port=3000)