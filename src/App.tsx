import React, { useState } from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from 'react-google-login';

export function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function app() {
    return (
      <div className="App">
        <header className="App-header">This is a header</header>
        And here is some text
      </div>
    );
  }

  function loginStuff() {
    if (isAuthenticated) {
      return (
        <GoogleLogout
          clientId="697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => onLogout()}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId="697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) =>
            onSuccess(response)
          }
          cookiePolicy={'single_host_origin'}
          onFailure={(response: any) => onFailure(response)}
          isSignedIn={true}
        />
      );
    }
  }

  function onLogout() {
    // eslint-disable-next-line no-console
    console.log('logged out');
    setIsAuthenticated(false);
  }

  function onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    // eslint-disable-next-line no-console
    console.log(response);
    setIsAuthenticated(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFailure(response: any) {
    // eslint-disable-next-line no-console
    console.log(response);
    setIsAuthenticated(false);
  }
  return (
    <div>
      {loginStuff()}
      {isAuthenticated ? app() : null}
    </div>
  );
}
