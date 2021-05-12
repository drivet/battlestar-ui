import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function LoginPage(): JSX.Element {
  const user = useFirebaseAuth();
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="hero">
        <h1 className="title">Battlestar Galactica</h1>
      </div>
      <div className="section">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
      <div className="level">
        <NavLink className="level-item" to="/join">
          Need an account?
        </NavLink>
      </div>
    </div>
  );
}
