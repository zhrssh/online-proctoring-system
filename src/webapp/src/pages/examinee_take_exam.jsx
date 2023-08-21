import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import ExamTimer from "./components/timer";
import WebcamRecorder from "./components/recorder";
import Questionnaire from "./components/questionnaire";

export default function ExamineeTakeExam() {
	const timerRef = React.useRef(null);
	const recorderRef = React.useRef(null);

	const navigate = useNavigate();

	function handleReturn() {
		navigate("/examinee/take_exam/success");
	}

	React.useEffect(() => timerRef.current.pause());

	return (
		<React.Fragment>
			<CssBaseline />
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
				<ExamTimer
					ref={timerRef}
					onExpire={() => recorderRef.current.handleStopCapture()}
				/>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}>
					<Box id="questionnaire" component="form" noValidate>
						<Questionnaire />
						<WebcamRecorder
							onRecordingStarted={() => timerRef.current.start()}
							onRecordingUploaded={() => handleReturn()}
							ref={recorderRef}
						/>
					</Box>
				</Paper>
			</Container>
		</React.Fragment>
	);
}
