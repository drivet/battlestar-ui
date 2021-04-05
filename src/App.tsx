import './App.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './auth/AuthProvider';
import { Login } from './auth/Login';
import { PrivateRoute } from './auth/PrivateRoute';
import { Landing } from './landing/Landing';
import { CurrentTables } from './tables/CurrentTables';
import { SentInvites } from './tables/SentInvites';

export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/current-tables">
              <CurrentTables />
            </PrivateRoute>
            <PrivateRoute exact path="/sent-invites">
              <SentInvites />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
