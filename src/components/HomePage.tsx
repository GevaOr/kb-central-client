import { FC } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom';
import Logout from './Logout';
import LandingNavBar from './LandingNavBar';
import PassReset from './PassReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingFooter from './LandingFooter';
import HomeWelcome from './HomeWelcome';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const useStyles = makeStyles((theme: Theme) => ({
    landingMain: {
        height: '100%',
    },
}));

const HomePage: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.landingMain}>
            <CssBaseline />
            <LandingNavBar />
            <Switch>
                <Route exact path="/" component={HomeWelcome} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/passreset" component={PassReset} />
                <Route exact path="/logout" component={Logout} />
            </Switch>
            <LandingFooter />
        </div>
    )
}

export default HomePage;

