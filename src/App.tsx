import './App.css';
import './firebase/firebase-init';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { JoinPage } from './auth/JoinPage';
import { LoginPage } from './auth/LoginPage';
import { PrivateRoute } from './common/PrivateRoute';
import { LandingPage } from './landing/LandingPage';
import { EditProfilePage } from './profiles/EditProfilePage';
import { CreateTablePage } from './tables/CreateTablePage';
import { InvitationsPage } from './tables/InvitationsPage';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/join">
          <JoinPage />
        </Route>
        <PrivateRoute exact path="/profile">
          <EditProfilePage />
        </PrivateRoute>
        <PrivateRoute exact path="/invitations">
          <InvitationsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/create-table">
          <CreateTablePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
