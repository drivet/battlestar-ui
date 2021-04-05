import React from 'react';

import { AuthInfoState, DEFAULT_AUTH_INFO } from './auth-models';

export const AuthContext = React.createContext((undefined as unknown) as AuthInfoState);

export function useAuth(): AuthInfoState {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export function AuthProvider(props: any): JSX.Element {
  const authState = React.useState(DEFAULT_AUTH_INFO);
  return <AuthContext.Provider value={authState}>{props.children}</AuthContext.Provider>;
}
