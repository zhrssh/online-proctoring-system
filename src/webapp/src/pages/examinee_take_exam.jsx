import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

// TODO: Allow page to check the corrent answers
// TODO: Send recorded video to backend

export default function ExamineeTakeExam() {
	const [selectedValue, setSelectedValue] = React.useState("a");
	const navigate = useNavigate();

	function handleReturn() {
		navigate("/examinee/take_exam/success");
	}

	function setAnswer(event) {
		setSelectedValue(event.target.value);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			question: data.get("question"),
			options: {
				0: data.get("optionOne"),
				1: data.get("optionTwo"),
				2: data.get("optionThree"),
				3: data.get("optionFour"),
			},
			answer: selectedValue,
		});

		handleReturn();
	}

	// Ask to open camera and record the stream
	const webcamRef = React.useRef(null);
	const mediaRecorderRef = React.useRef(null);

	const [capturing, setCapturing] = React.useState(false);
	const [recordedChunks, setRecordedChunks] = React.useState([]);

	const handleDataAvailable = React.useCallback(
		({ data }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	const RecordStream = React.useCallback(() => {
		setCapturing(true);
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "video/mp4",
		});

		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);

		mediaRecorderRef.current.start();
	}, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

	// Stops the recording
	const handleStopCapture = React.useCallback(() => {
		mediaRecorderRef.current.stop();
		setCapturing(false);
	}, [mediaRecorderRef, setCapturing]);

	const handleSendVideo = React.useCallback(() => {
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: "video/mp4",
			});

			// TODO: Send blob to backend
		}
	}, [recordedChunks]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Box
				position="absolute"
				alignItems="center"
				justifyItems="center"
				display="none">
				<Webcam audio={false} ref={webcamRef} height={120} width={160} />
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div">
							Examination
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Container
				component="main"
				maxWidth="sm"
				sx={{ mb: 4, textAlign: "start" }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<Typography component="h1" variant="h6">
							Question #1
						</Typography>
						<Typography component="p" variant="body2">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Typography>
						<Grid
							container
							sx={{
								marginTop: "1em",
								marginBottom: "1em",
								placeItems: "center",
							}}>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "a"}
									onChange={setAnswer}
									value="a"
									name="radio-buttons"
									inputProps={{ "aria-label": "A" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option A
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "b"}
									onChange={setAnswer}
									value="b"
									name="radio-buttons"
									inputProps={{ "aria-label": "B" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option B
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "c"}
									onChange={setAnswer}
									value="c"
									name="radio-buttons"
									inputProps={{ "aria-label": "C" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option C
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "d"}
									onChange={setAnswer}
									value="d"
									name="radio-buttons"
									inputProps={{ "aria-label": "D" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option D
								</Typography>
							</Grid>
						</Grid>

						<Typography component="h1" variant="h6">
							Question #2
						</Typography>
						<Typography component="p" variant="body2">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</Typography>
						<Grid
							container
							sx={{
								marginTop: "1em",
								marginBottom: "1em",
								placeItems: "center",
							}}>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "a"}
									onChange={setAnswer}
									value="a"
									name="radio-buttons"
									inputProps={{ "aria-label": "A" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option A
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "b"}
									onChange={setAnswer}
									value="b"
									name="radio-buttons"
									inputProps={{ "aria-label": "B" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option B
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "c"}
									onChange={setAnswer}
									value="c"
									name="radio-buttons"
									inputProps={{ "aria-label": "C" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option C
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<Radio
									checked={selectedValue === "d"}
									onChange={setAnswer}
									value="d"
									name="radio-buttons"
									inputProps={{ "aria-label": "D" }}
									size="small"
								/>
							</Grid>
							<Grid item xs={10}>
								<Typography component="p" variant="button">
									Option D
								</Typography>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
							Submit
						</Button>
					</Box>
				</Paper>
			</Container>
		</React.Fragment>
	);
}
