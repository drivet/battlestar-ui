import React from 'react';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
  useGoogleLogout,
} from 'react-google-login';

import { AuthContextState, AuthInfo, Profile } from './auth-models';

type AllGoogleLoginResponse = GoogleLoginResponse | GoogleLoginResponseOffline;
type CallbackFn = () => void;

const AUTH_INFO_UNAUTHENTICATED: AuthInfo = {
  isAuthenticated: false,
};

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

function useAuthLogout(setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>) {
  let signOutCb: CallbackFn | undefined = undefined;

  function onSignOutSuccess() {
    // eslint-disable-next-line no-console
    console.log('Successfuly logged out');
    setAuthInfo(AUTH_INFO_UNAUTHENTICATED);
    if (signOutCb) {
      signOutCb();
      signOutCb = undefined;
    }
  }

  const { signOut } = useGoogleLogout({
    clientId: '697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com',
    onLogoutSuccess: onSignOutSuccess,
    onFailure: () => setAuthInfo(AUTH_INFO_UNAUTHENTICATED),
  });

  const authLogout = (cb: CallbackFn) => {
    signOutCb = cb;
    signOut();
  };
  return authLogout;
}

function useAuthLogin(setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>) {
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

  function onAutoLoadFinished(authenticated: boolean) {
    if (!authenticated) {
      setAuthInfo({ isAuthenticated: false });
    }
    // we don't handle authenticated = true here because the
    // onSucess callback should do it
  }

  const { signIn } = useGoogleLogin({
    clientId: '697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com',
    onSuccess: onSignInSuccess,
    onAutoLoadFinished: onAutoLoadFinished,
    onFailure: () => setAuthInfo(AUTH_INFO_UNAUTHENTICATED),
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  const authLogin = (cb: CallbackFn) => {
    signInCb = cb;
    signIn();
  };
  return authLogin;
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
  const [authInfo, setAuthInfo] = React.useState((undefined as unknown) as AuthInfo);
  const authLogin = useAuthLogin(setAuthInfo);
  const authLogout = useAuthLogout(setAuthInfo);
  const authState = {
    authInfo,
    signIn: authLogin,
    signOut: authLogout,
  };

  return <AuthContext.Provider value={authState}>{props.children}</AuthContext.Provider>;
}
