import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CenterFocusWeakOutlinedIcon from '@mui/icons-material/CenterFocusWeakOutlined';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            examCode: data.get('examCode'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <CenterFocusWeakOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6">
                        Online Proctoring System DEMO
                    </Typography>
                    <Typography component="p" variant="subtitle2">
                        Logging in as Examinee
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="examCode"
                            label="Exam Code"
                            name="examCode"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Take Exam
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="proctor" variant="body2">
                                    Not an Examinee? Login as Proctor
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}