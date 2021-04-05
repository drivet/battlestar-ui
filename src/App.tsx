import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthProvider } from './auth/AuthProvider';
import { Landing } from './landing/Landing';
import { CurrentTables } from './tables/CurrentTables';

export function App(): JSX.Element {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Switch>
          <Route exact path="/landing" component={Landing} />
          <Route exact path="/current-tables" component={CurrentTables} />
        </Switch>
      </AuthProvider>
    </React.StrictMode>
  );
}
