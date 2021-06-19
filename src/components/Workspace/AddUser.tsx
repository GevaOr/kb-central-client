import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { IRegisterInputs } from '../../models/models';
import { fireRegister } from '../../services/auth.service';

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
        color: theme.palette.error.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddUser: FC = () => {
    const classes = useStyles();
    const {
        register,
        // reset,
        handleSubmit,
        formState: {
            errors,
        } } = useForm<IRegisterInputs>()

    // const resetValues = { firstName: "", lastName: "", email: "", password: "" }

    const history = useHistory();
    const [addAsAdmin, setAddAsAdmin] = useState<boolean>()

    const emailSignUp: SubmitHandler<IRegisterInputs> = async (data: IRegisterInputs) => {
        await fireRegister(data);
        history.push('/workspace')
        // console.log(data);

    };

    useEffect(() => {
        setAddAsAdmin(false)
    }, [])

    // const gSignUp = () => {
    //     console.log('Google Sign Up');
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    Add new user
                </Typography>
                <form className={classes.form} onSubmit={
                    handleSubmit(emailSignUp)
                }>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                // autoFocus
                                {...register("firstName", { pattern: /[a-zA-Z]{2,}$/ })} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                {...register("lastName", { pattern: /[a-zA-Z]{1,}$/ })} />
                        </Grid>
                        <Grid item xs={12}>
                            {errors.firstName &&
                                <Typography className={classes.errorMsg} variant="subtitle1">First name is required and has to be at least 2 characters (a-z).</Typography>
                            }
                            {errors.lastName &&
                                <Typography className={classes.errorMsg} variant="subtitle1">Last name has to be at least 1 character (a-z).</Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email" type="email"
                                {...register("email", { pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} />
                            {errors.email &&
                                <Typography className={classes.errorMsg} variant="subtitle1">Invalid email address.</Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                {...register("password", { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                            {errors.password &&
                                <Typography className={classes.errorMsg} variant="subtitle1">Password must be minimun 6 characters and include both digits and letters.</Typography>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value={addAsAdmin} onChange={() => setAddAsAdmin(!addAsAdmin)} color="primary" />}
                                label="Add as admin?"
                                {...register("isAdmin")}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add User
                    </Button>
                    {/* <GoogleButton
                        style={{
                            width: '100%',
                            filter: 'brightness(95%)',
                            marginBottom: '1rem',

                        }}
                        label="Sign up with Google"
                        onClick={gSignUp}
                    /> */}
                    {/* <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="signin" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
        </Container>
    );
}

export default AddUser;
