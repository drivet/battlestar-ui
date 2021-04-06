import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './common/AuthProvider';
import { LoginPage } from './auth/LoginPage';
import { PrivateRoute } from './common/PrivateRoute';
import { LandingPage } from './landing/LandingPage';
import { CurrentTablesPage } from './tables/CurrentTablesPage';
import { SentInvitesPage } from './tables/SentInvitesPage';

export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute exact path="/current-games">
              <CurrentTablesPage />
            </PrivateRoute>
            <PrivateRoute exact path="/sent-invites">
              <SentInvitesPage />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
