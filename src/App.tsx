import './App.css';
import './firebase/firebase-init';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { JoinPage } from './auth/JoinPage';
import { LoginPage } from './auth/LoginPage';
import { PrivateRoute } from './common/PrivateRoute';
import { LandingPage } from './landing/LandingPage';
import { CreateTablePage } from './tables/CreateTablePage';
import { CurrentTablesPage } from './tables/CurrentTablesPage';
import { ReceivedInvitesPage } from './tables/ReceivedInvitesPage';
import { SentInvitesPage } from './tables/SentInvitesPage';

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
        <PrivateRoute exact path="/current-games">
          <CurrentTablesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/sent-invites">
          <SentInvitesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/received-invites">
          <ReceivedInvitesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/create-table">
          <CreateTablePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
