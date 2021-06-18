import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import { ClassNameMap } from '@material-ui/styles';

import { useAuth } from '../authProvider';
import { ILoginInputs } from '../models/models';
import { fireLogin, fireLogout } from '../services/auth.service';

// import GoogleButton from 'react-google-button';


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    errorMsg: {
        // color: theme.palette.error.main,
        margin: '1em 0',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn: FC = () => {
    const classes: ClassNameMap = useStyles();
    const {
        register,
        handleSubmit,
        // formState: {
        //     errors,
        // }
    } = useForm<ILoginInputs>()

    const history = useHistory();

    const [errMsg, setErrMsg] = useState<string>("");
    const { user } = useAuth();

    const emailSignIn = async (data: ILoginInputs) => {
        await fireLogin(data.email, data.password)
            .then(() => {
                setErrMsg("")
                history.push('/');
            })
            .catch(() => {
                setErrMsg("Wrong Email/Password.")
            })
    };

    // const gSignIn = () => {
    //     console.log('Google Sign In');

    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            { user &&
                <div className={classes.paper}>
                    <Typography variant="h4" color="initial">You are already logged in!</Typography>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => fireLogout()}
                    >
                        Logout?
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push('/')}
                >
                    Go Home
                </Button>
                </div>
            }
            { !user &&
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                        Sign in
                    </Typography>
                <form className={classes.form} onSubmit={handleSubmit(emailSignIn)}>
                    {errMsg &&
                        <Alert className={classes.errorMsg} severity="error">
                            {errMsg}
                        </Alert>
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        type="email"
                        {...register("email", { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        label="Password"
                        type="password"
                        id="password"
                        // autoComplete="current-password"
                        {...register("password", { pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/ })} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                        </Button>
                    {/* <GoogleButton
                        style={{
                            width: '100%',
                            filter: 'brightness(95%)',
                            marginBottom: '1rem',

                        }}
                        onClick={gSignIn}
                    /> */}
                    <Grid container>
                        {/* <Grid item xs>
                            <Link href="/passreset" variant="body2">
                                Forgot password?
                                </Link>
                        </Grid> */}
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            }
        </Container>
    );
}

export default SignIn;