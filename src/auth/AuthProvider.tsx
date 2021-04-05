import React from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
  useGoogleLogout,
} from 'react-google-login';

import { AuthContextState, DEFAULT_AUTH_INFO, Profile } from './auth-models';

type AllGoogleLoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
type CallbackFn = () => void;

function makeProfile(response: GoogleLoginResponse): Profile {
  return {
    id: response.getBasicProfile().getId(),
    email: response.getBasicProfile().getEmail(),
    givenName: response.getBasicProfile().getGivenName(),
    familyName: response.getBasicProfile().getFamilyName(),
    name: response.getBasicProfile().getName(),
    imageUrl: response.getBasicProfile().getImageUrl(),
  };
}

export const AuthContext = React.createContext((undefined as unknown) as AuthContextState);

export function useAuth(): AuthContextState {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export function AuthProvider(props: any): JSX.Element {
  const [authInfo, setAuthInfo] = React.useState(DEFAULT_AUTH_INFO);

  let signInCb: CallbackFn | undefined = undefined;

  function onSignInSuccess(response: AllGoogleLoginResponse) {
    // eslint-disable-next-line no-console
    console.log(response);
    if (response.code) {
      throw Error('You are offline, cannot authenticate');
    }
    setAuthInfo({
      isAuthenticated: true,
      profile: makeProfile(response as GoogleLoginResponse),
    });
    if (signInCb) {
      signInCb();
      signInCb = undefined;
    }
  }

  const { signIn } = useGoogleLogin({
    clientId: '697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com',
    onSuccess: onSignInSuccess,
    onFailure: () => setAuthInfo(DEFAULT_AUTH_INFO),
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  const authLogin = (cb: CallbackFn) => {
    signInCb = cb;
    signIn();
  };

  let signOutCb: CallbackFn | undefined = undefined;

  function onSignOutSuccess() {
    // eslint-disable-next-line no-console
    console.log('Successfuly logged out');
    setAuthInfo(DEFAULT_AUTH_INFO);
    if (signOutCb) {
      signOutCb();
      signOutCb = undefined;
    }
  }

  const { signOut } = useGoogleLogout({
    clientId: '697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com',
    onLogoutSuccess: onSignOutSuccess,
    onFailure: () => setAuthInfo(DEFAULT_AUTH_INFO),
  });

  const authLogout = (cb: CallbackFn) => {
    signOutCb = cb;
    signOut();
  };

  const authState = {
    authInfo,
    signIn: authLogin,
    signOut: authLogout,
  };

  return <AuthContext.Provider value={authState}>{props.children}</AuthContext.Provider>;
}
