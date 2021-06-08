// import { Typography } from '@material-ui/core';
// import { useAuth } from '../authProvider';
import { FC } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import Logout from './Logout';
import LandingNavBar from './LandingNavBar';
import PassReset from './PassReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomeWelcome from './HomeWelcome';

const HomePage: FC = () => {
    return (
        <div>
            <Router>
                <LandingNavBar />
                <Switch>
                    <Route exact path="/" component={HomeWelcome} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/passreset" component={PassReset} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </Router >
        </div>
    )
}

export default HomePage;

