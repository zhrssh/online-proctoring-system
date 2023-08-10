import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import CenterFocusWeakOutlinedIcon from "@mui/icons-material/CenterFocusWeakOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const defaultTheme = createTheme();

export default function ExamineeTakeExamSuccess() {
	const navigate = useNavigate();
	const [success, setSuccess] = useState(true);

	// Returns to the main proctor page
	function handleReturn() {
		navigate("/");
	}

	// Checks if exam has successfully created
	function handleSuccess(value) {
		setSuccess(value);
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<CenterFocusWeakOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h6">
						Online Proctoring System DEMO
					</Typography>
					{success ? (
						<Box component="div" marginY="0.5em">
							<Alert severity="success">
								Exam successfully submitted! Your score is written below.
							</Alert>
							<Typography
								component="h3"
								variant="h3"
								sx={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
								50 out of 60
							</Typography>
						</Box>
					) : (
						<Alert severity="error">
							An error has occurred when creating the exam. Please try again.
						</Alert>
					)}

					<Button
						type="button"
						fullWidth
						variant="contained"
						onClick={handleReturn}>
						Done
					</Button>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
