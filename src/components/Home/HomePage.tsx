import { FC } from 'react';
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';

import HomeWelcome from './HomeWelcome';
import LandingFooter from './LandingFooter';
import LandingNavBar from './LandingNavBar';
import Logout from './Logout';
// import PassReset from './PassReset';
import SignIn from './SignIn';

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

