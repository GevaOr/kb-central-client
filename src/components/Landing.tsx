import { FC } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useRouteMatch,
    // useParams
} from 'react-router-dom';
// import { AuthProvider } from '../authProvider';
import Home from './Home';
import Logout from './Logout';
import LandingNavBar from './LandingNavBar';
import PageNotFound from './PageNotFound';
import PassReset from './PassReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import Workspace from './Workspace';
// import { useAuth } from '../authProvider';

const Landing: FC = () => {
    // const { user, loading, logout } = useAuth();
    let { path } = useRouteMatch();

    // if (loading) return (
    //   <p>LOADING</p>
    // );
    // if (!user) return (
    //   <p>No user</p>
    // );
    return (
        <Router>
            {/* <LandingNavBar /> */}
            <Switch>
                <Route exact path={path + "signin"} component={SignIn} />
                <Route exact path={path + "signup"} component={SignUp} />
                <Route exact path={path + "passreset"} component={PassReset} />
                <Route exact path={path + "logout"} component={Logout} />
                <Route exact path={path} component={Home} />
                <Route path={path + "*"} component={PageNotFound} />
            </Switch>
        </Router >
    );
}

export default Landing;