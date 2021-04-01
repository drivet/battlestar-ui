import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from 'react-google-login';

interface State {
  isAuthenticated: boolean;
}

export class App extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  render(): JSX.Element {
    return (
      <div>
        {this.loginStuff()}
        {this.state.isAuthenticated ? this.app() : null}
      </div>
    );
  }

  private app() {
    return (
      <div className="App">
        <header className="App-header">This is a header</header>
        And here is some text
      </div>
    );
  }

  private loginStuff() {
    if (this.state.isAuthenticated) {
      return (
        <GoogleLogout
          clientId="697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={() => this.onLogout()}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId="697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) =>
            this.onSuccess(response)
          }
          cookiePolicy={'single_host_origin'}
          onFailure={(response: any) => this.onFailure(response)}
          isSignedIn={true}
        />
      );
    }
  }

  private onLogout() {
    // eslint-disable-next-line no-console
    console.log('logged out');
    this.setState({ isAuthenticated: false });
  }

  private onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    // eslint-disable-next-line no-console
    console.log(response);
    this.setState({ isAuthenticated: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onFailure(response: any) {
    // eslint-disable-next-line no-console
    console.log(response);
    this.setState({ isAuthenticated: false });
  }
}
