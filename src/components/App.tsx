import { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useRouteMatch,
  // useParams
} from 'react-router-dom';
import { AuthProvider } from '../authProvider';
import Home from './Home';
import Logout from './Logout';
// import LandingNavBar from './LandingNavBar';
import PageNotFound from './PageNotFound';
import PassReset from './PassReset';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Workspace from './Workspace';
// import { useAuth } from '../authProvider';

const App: FC = () => {
  // const { user, loading, logout } = useAuth();
  // if (loading) return (
  //   <p>LOADING</p>
  // );
  // if (!user) return (
  //   <p>No user</p>
  // );
  return (
    <AuthProvider>
      <Router>
        {/* <LandingNavBar /> */}
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/passreset" component={PassReset} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
          <Route path="/workspace" component={Workspace} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router >
    </AuthProvider>
  );
}

export default App;