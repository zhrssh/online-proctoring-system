import head_pose as hp

FILE_PATH = 0

if __name__ == '__main__':
    head_pose = hp.HeadPoseEstimation(FILE_PATH, None)
    head_pose.preprocessed()