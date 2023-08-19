import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";

// TODO: TEST BLOB IF WORKING
// TODO: MAKE SUBMIT NAVIGATE TO SUCCESS PAGE

export default function WebcamRecorder() {
	const videoRef = React.useRef(null);
	const streamRef = React.useRef(null);
	const mediaRecorderRef = React.useRef(null);
	const [capturing, setCapturing] = React.useState(false);
	const [recordedChunks, setRecordedChunks] = React.useState([]);
	const [openBackdrop, setOpenBackdrop] = React.useState(true);
	const videoConstraints = {
		width: 160,
		height: 120,
		facingMode: "user",
	};

	// Starts the camera
	const handleStartCamera = React.useCallback(async () => {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });

		if (stream) {
			videoRef.current.srcObject = stream;
			streamRef.current = stream;
			return true;
		} else {
			console.error("Error accessing the webcam.");
			return false;
		}
	}, [videoRef]);

	// Starts the recording of the webcam
	const handleStartCapture = React.useCallback(async () => {
		setCapturing(true);
		setOpenBackdrop(false);

		if (videoRef.current) {
			console.log("Recording");
			mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject, {
				mimeType: "video/webm",
			});

			// Handles available data and concatinates it into video chunks
			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0) {
					setRecordedChunks((value) => value.push(event.data));
				}
			};

			mediaRecorderRef.current.onstop = () => {
				if (recordedChunks.length) {
					console.log("Recorded chunks:", recordedChunks);
					handleUpload();
				} else {
					console.error("No recorded chunks found");
				}
			};

			// Starts the recording
			mediaRecorderRef.current.start();
		}
	}, [setOpenBackdrop, videoRef, mediaRecorderRef]);

	// Stops the capturing of the video
	const handleStopCapture = React.useCallback(() => {
		console.log("Stopping Recording");
		setCapturing(false);

		mediaRecorderRef.current.stop();
		streamRef.current.getTracks().forEach((track) => track.stop());
	}, [setCapturing, mediaRecorderRef, recordedChunks]);

	// Uploads the video to the backend
	const handleUpload = React.useCallback(async () => {
		try {
			if (recordedChunks.length) {
				const blob = new Blob(recordedChunks, {
					type: "video/webm",
				});

				const url = URL.createObjectURL(blob);
				setRecordedVideoURL(url);

				// // Creates form data for preparing the packet
				// const formData = new FormData();
				// formData.append("file", blob);

				// const response = await fetch("/upload", {
				// 	method: "POST",
				// 	body: formData,
				// });

				// // Displays the response from the server
				// const responseText = await response.text();
				// console.log(responseText);

				// Clears the recorded chunks after upload
				setRecordedChunks([]);
			}
		} catch (e) {
			console.log("Error uploading video to backend", e);
		}
	}, [setRecordedChunks, recordedChunks]);

	const startCameraAndRecord = React.useCallback(async () => {
		const isCameraOn = await handleStartCamera();

		if (isCameraOn) {
			handleStartCapture();
		}
	}, []);

	return (
		<>
			<Backdrop
				open={openBackdrop}
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}>
				<Grid container sx={{ flexGrow: 1, textAlign: "center" }}>
					<Grid item xs={12}>
						<Button
							type="button"
							onClick={() => startCameraAndRecord()}
							variant="contained"
							sx={{ mb: 2 }}
							disabled={capturing}>
							Start examination
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="caption" component="span">
							Note: This will start recording your webcam.
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
			<Box component="div" sx={{ position: "absolute", display: "none" }}>
				<video
					height={videoConstraints.height}
					width={videoConstraints.width}
					autoPlay
					playsInline
					ref={videoRef}
				/>
			</Box>
			<Box
				component="div"
				sx={{ position: "absolute", display: "block" }}></Box>
			<Button
				type="submit"
				onClick={handleStopCapture}
				fullWidth
				variant="contained"
				sx={{ mb: 2 }}
				disabled={!capturing}>
				Submit
			</Button>
		</>
	);
}
