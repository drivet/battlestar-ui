import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from 'react-google-login';

import { AuthInfo, DEFAULT_AUTH_INFO, Profile } from '../auth/auth-models';

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

interface AuthButtonProps {
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
}

export function AuthButton(props: AuthButtonProps): JSX.Element {
  function onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    // eslint-disable-next-line no-console
    console.log(response);
    if (response.code) {
      throw Error('You are offline, cannot authenticate');
    }
    props.setAuthInfo({
      isAuthenticated: true,
      profile: makeProfile(response as GoogleLoginResponse),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onFailure(response: any) {
    // eslint-disable-next-line no-console
    console.log(response);
    props.setAuthInfo(DEFAULT_AUTH_INFO);
  }

  const { signIn } = useGoogleLogin({
    clientId: '697453209068-7tulp9hdi8udrpl8j1n792f2olqp1uln.apps.googleusercontent.com',
    onSuccess,
    onFailure,
    isSignedIn: true,
    cookiePolicy: 'single_host_origin',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/GoogleLogin.svg" />
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}
