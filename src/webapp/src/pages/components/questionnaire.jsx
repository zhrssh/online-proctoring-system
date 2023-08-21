import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

export default function Questionnaire() {
	return (
		<>
			{/** QUESTION 1 **/}
			<Typography component="h1" variant="h6">
				Question #1
			</Typography>
			<Typography component="p" variant="body1">
				What is Ethics?
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
						value="a"
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						A branch of mathematics
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="b"
						name="radio-buttons"
						inputProps={{ "aria-label": "B" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						A system of moral principles
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="c"
						name="radio-buttons"
						inputProps={{ "aria-label": "C" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						A type of technology
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="d"
						name="radio-buttons"
						inputProps={{ "aria-label": "D" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						A form of government
					</Typography>
				</Grid>
			</Grid>

			{/** QUESTION 2 **/}
			<Typography component="h1" variant="h6">
				Question #2
			</Typography>
			<Typography component="p" variant="body1">
				Which of the following best describes moral relativism?
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
						value="a"
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						There are objective moral truths
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="b"
						name="radio-buttons"
						inputProps={{ "aria-label": "B" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Morality is determined by personal or cultural beliefs
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="c"
						name="radio-buttons"
						inputProps={{ "aria-label": "C" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Moral values are fixed and unchanging
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="d"
						name="radio-buttons"
						inputProps={{ "aria-label": "D" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Morality is solely based on religious teachings
					</Typography>
				</Grid>
			</Grid>

			{/** QUESTION 3 **/}
			<Typography component="h1" variant="h6">
				Question #3
			</Typography>
			<Typography component="p" variant="body1">
				What is a common ethical principle emphasizing the greatest good for the
				greatest number?
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
						value="a"
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Egoism
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="b"
						name="radio-buttons"
						inputProps={{ "aria-label": "B" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Utilitarianism
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="c"
						name="radio-buttons"
						inputProps={{ "aria-label": "C" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Virtue ethics
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="d"
						name="radio-buttons"
						inputProps={{ "aria-label": "D" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Deontological ethics
					</Typography>
				</Grid>
			</Grid>

			{/** QUESTION 4 **/}
			<Typography component="h1" variant="h6">
				Question #4
			</Typography>
			<Typography component="p" variant="body1">
				Which ethical theory focuses on the intention behind an action rather
				than its consequences?
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
						value="a"
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Consequentialism
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="b"
						name="radio-buttons"
						inputProps={{ "aria-label": "B" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Virtue ethics
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="c"
						name="radio-buttons"
						inputProps={{ "aria-label": "C" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Deontology
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="d"
						name="radio-buttons"
						inputProps={{ "aria-label": "D" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						Relativism
					</Typography>
				</Grid>
			</Grid>

			{/** QUESTION 5 **/}
			<Typography component="h1" variant="h6">
				Question #5
			</Typography>
			<Typography component="p" variant="body1">
				What is a potential criticism of consequentialist ethical theories?
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
						value="a"
						name="radio-buttons"
						inputProps={{ "aria-label": "A" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						They can lead to inconsistent decision-making
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="b"
						name="radio-buttons"
						inputProps={{ "aria-label": "B" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						They prioritize individual desires over overall well-being
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="c"
						name="radio-buttons"
						inputProps={{ "aria-label": "C" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						They disregard intentions and motives
					</Typography>
				</Grid>
				<Grid item xs={2}>
					<Radio
						value="d"
						name="radio-buttons"
						inputProps={{ "aria-label": "D" }}
						size="small"
					/>
				</Grid>
				<Grid item xs={10}>
					<Typography component="p" variant="body2">
						They are too rigid in their rules
					</Typography>
				</Grid>
			</Grid>
		</>
	);
}
