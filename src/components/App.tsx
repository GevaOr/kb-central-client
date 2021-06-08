import { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from '../authProvider';
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import Workspace from './Workspace';
// import Logout from './Logout';
// import LandingNavBar from './LandingNavBar';
// import PassReset from './PassReset';
// import SignIn from './SignIn';
// import SignUp from './SignUp';
// import { useAuth } from '../authProvider';

const App: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/workspace" component={Workspace} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router >
    </AuthProvider>
  );
}

export default App;