import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { FC, useState } from 'react';
import GoogleButton from 'react-google-button';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ILoginInputs } from '../models/models';
import { fireLogin } from '../services/auth.service';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        // formState: {
        //     errors,
        // }
    } = useForm<ILoginInputs>()

    const history = useHistory();

    const [errMsg, setErrMsg] = useState<string>("");

    const emailSignIn = async (data: ILoginInputs) => {
        await fireLogin(data.email, data.password)
            .then((res) => {
                setErrMsg("")
                history.push('/workspace')
            })
            .catch((err) => {
                setErrMsg("Wrong Email/Password.")
            })
    };

    const gSignIn = () => {
        console.log('Google Sign In');

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={
                    handleSubmit(emailSignIn)
                }>
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
                    {/* {errors.email &&
                        <Typography variant="subtitle1">Invalid email address</Typography>
                    } */}
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
                    {/* {errors.password &&
                        <Typography variant="subtitle1">Password must be minimun 6 characters and include both digits and letters.</Typography>
                    } */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <GoogleButton
                        style={{
                            width: '100%',
                            filter: 'brightness(95%)',
                            marginBottom: '1rem',

                        }}
                        onClick={gSignIn}
                    />
                    <Grid container>
                        <Grid item xs>
                            <Link href="/passreset" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignIn;