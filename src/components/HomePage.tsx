import { FC } from 'react'
import {
    Route,
    Switch,
    BrowserRouter,
    useRouteMatch
} from 'react-router-dom';
import Logout from './Logout';
import LandingNavBar from './LandingNavBar';
// import PassReset from './PassReset';
import SignIn from './SignIn';
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
    const { url } = useRouteMatch();

    return (
        <BrowserRouter>
            <div className={classes.landingMain}>
                <CssBaseline />
                <LandingNavBar />
                <Switch>
                    <Route exact path={`${url}/`} component={HomeWelcome} />
                    <Route path={`${url}signin`} component={SignIn} />
                    {/* <Route exact path="/passreset" component={PassReset} /> */}
                    <Route exact path={`${url}logout`} component={Logout} />
                </Switch>
                <LandingFooter />
            </div>
        </BrowserRouter>
    )
}

export default HomePage;

