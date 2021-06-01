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
import NavBar from './NavBar';
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
        <NavBar />
        <Switch>
          <Route exact path="/workspace">
            <Workspace />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/passreset">
            <PassReset />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router >
    </AuthProvider>
  );
}

export default App;