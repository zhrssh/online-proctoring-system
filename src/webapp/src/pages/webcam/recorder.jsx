import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
<<<<<<< HEAD
import Webcam from "react-webcam";
=======
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300

// TODO: TEST BLOB IF WORKING
// TODO: MAKE SUBMIT NAVIGATE TO SUCCESS PAGE

export default function WebcamRecorder() {
	const webcamRef = React.useRef(null);
	const mediaRecorderRef = React.useRef(null);
	const [capturing, setCapturing] = React.useState(false);
	const [recordedChunks, setRecordedChunks] = React.useState([]);
	const [openBackdrop, setOpenBackdrop] = React.useState(true);
	const videoConstraints = {
		width: 160,
		height: 120,
		facingMode: "user",
	};

	// Handles available data and concatinates it into video chunks
	const handleDataAvailable = React.useCallback(
		({ data }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	// Starts the recording of the webcam
<<<<<<< HEAD
	const handleStartCapture = React.useCallback(() => {
		console.log("Recording");
		setCapturing(true);
		setOpenBackdrop(false); // Closes the backdrop

		mediaRecorderRef.current = new MediaRecorder(
			webcamRef.current.video.srcObject
		);

		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);

		mediaRecorderRef.current.start();
	}, [mediaRecorderRef, handleDataAvailable]);
=======
	const handleStartCapture = React.useCallback(
		(stream) => {
			setOpenBackdrop(false);

			if (stream) {
				console.log("Recording");
				mediaRecorderRef.current = new MediaRecorder(
					webcamRef.current.video.srcObject,
					{
						mimeType: "video/webm",
					}
				);

				mediaRecorderRef.current.addEventListener(
					"dataavailable",
					handleDataAvailable
				);

				// Starts the recording
				mediaRecorderRef.current.start();
			}
		},
		[setOpenBackdrop, mediaRecorderRef, handleDataAvailable]
	);
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300

	// Stops the capturing of the video
	const handleStopCapture = React.useCallback(() => {
		console.log("Stopping Recording");
		setCapturing(false);

		if (recordedChunks.length) {
			console.log("Recorded chunks:", recordedChunks);
<<<<<<< HEAD
		}

		mediaRecorderRef.current.stop();
	}, [mediaRecorderRef, recordedChunks]);
=======
		} else {
			console.log("No recorded chunks found");
		}

		mediaRecorderRef.current.stop();
	}, [setCapturing, mediaRecorderRef, recordedChunks]);
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300

	// Uploads the video to the backend
	const handleUpload = React.useCallback(async () => {
		try {
			if (recordedChunks.length) {
				const blob = new Blob(recordedChunks, {
					type: "video/webm",
				});

				// Creates form data for preparing the packet
				const formData = new FormData();
				formData.append("file", blob);

				const response = await fetch("/upload", {
					method: "POST",
					body: formData,
				});

				// Displays the response from the server
				const responseText = await response.text();
				console.log(responseText);

				// Clears the recorded chunks after upload
				setRecordedChunks([]);
			}
		} catch (e) {
			console.log("Error uploading video to backend", e);
		}
<<<<<<< HEAD
	}, [recordedChunks]);
=======
	}, [setRecordedChunks, recordedChunks]);
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300

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
<<<<<<< HEAD
=======
						<Button
							type="button"
							onClick={() => setCapturing(true)}
							variant="contained"
							sx={{ mb: 2 }}
							disabled={capturing}>
							Start examination
						</Button>
					</Grid>
					<Grid item xs={12}>
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300
						<Typography variant="caption" component="span">
							Note: This will start recording your webcam.
						</Typography>
					</Grid>
<<<<<<< HEAD
					<Grid item xs={12}>
						<Button
							type="button"
							onClick={handleStartCapture}
							variant="contained"
							sx={{ mb: 2 }}>
							Start examination
						</Button>
					</Grid>
				</Grid>
			</Backdrop>
			<Box component="div" sx={{ position: "absolute", display: "none" }}>
				<Webcam
					audio={false}
					height={120}
					width={160}
					videoConstraints={videoConstraints}
					ref={webcamRef}
				/>
			</Box>
=======
				</Grid>
			</Backdrop>
			<Box
				component="div"
				sx={{ position: "absolute", display: "block" }}></Box>
>>>>>>> c89bb0e6ab64f1414e6830fa79a71de5e8ea8300
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
