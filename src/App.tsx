import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './firebase/firebase-init';
import './firebase/firebase-axios';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { JoinPage } from './auth/JoinPage';
import { LoginPage } from './auth/LoginPage';
import { PrivateRoute } from './common/PrivateRoute';
import { CreateTablePage } from './tables/CreateTablePage';
import { InvitationsPage } from './tables/InvitationsPage';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/join">
          <JoinPage />
        </Route>
        <PrivateRoute exact path="/">
          <InvitationsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/create-table">
          <CreateTablePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
