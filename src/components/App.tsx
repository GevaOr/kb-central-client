import { FC } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { AuthProvider } from '../authProvider';
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import Workspace from './Workspace';

const App: FC = () => {

  return (
    <AuthProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/workspace" component={Workspace} />
          <Route path="*" component={PageNotFound} />
      </Switch>
    </AuthProvider>
  );
}

export default App;