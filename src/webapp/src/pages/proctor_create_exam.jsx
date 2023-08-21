import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ProctorCreateExam() {
	const [selectedValue, setSelectedValue] = React.useState("a");
	const navigate = useNavigate();

	function handleReturn() {
		navigate("/proctor");
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
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div">
							Create Exam
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
					<Box component="form" onSubmit={handleSubmit} noValidate>
						<Typography
							component="h6"
							variant="h6"
							sx={{ textAlign: "start", marginBottom: "0.5em" }}>
							Create your question here
						</Typography>
						<TextField
							required
							id="question"
							label="Question"
							name="question"
							placeholder="Type your question here..."
							multiline
							rows={4}
							fullWidth
							variant="filled"
							sx={{
								marginBottom: 2,
							}}
						/>
						<Grid container sx={{ marginBottom: 2 }}>
							<Grid item xs={2} sx={{ alignSelf: "end" }}>
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
								<TextField
									id="optionOne"
									name="optionOne"
									label="Option 1"
									fullWidth
									variant="standard"
								/>
							</Grid>
							<Grid item xs={2} sx={{ alignSelf: "end" }}>
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
								<TextField
									id="optionTwo"
									name="optionTwo"
									label="Option 2"
									fullWidth
									variant="standard"
								/>
							</Grid>
							<Grid item xs={2} sx={{ alignSelf: "end" }}>
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
								<TextField
									id="optionThree"
									name="optionThree"
									label="Option 3"
									fullWidth
									variant="standard"
								/>
							</Grid>
							<Grid item xs={2} sx={{ alignSelf: "end" }}>
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
								<TextField
									id="optionFour"
									name="optionFour"
									label="Option 4"
									fullWidth
									variant="standard"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 2, mb: 2 }}>
							Create Question
						</Button>
					</Box>
					<Button
						type="button"
						fullWidth
						onClick={handleReturn}
						variant="contained"
						sx={{ mb: 2 }}>
						Done
					</Button>
				</Paper>
			</Container>
		</React.Fragment>
	);
}
