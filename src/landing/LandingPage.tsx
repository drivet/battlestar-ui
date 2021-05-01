import { Link } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';

function OpenAppLink(): JSX.Element {
  return (
    <div>
      <Link className="button" to="/current-games">
        <span className="buttonText">Open App</span>
      </Link>
    </div>
  );
}

function LoginLink(): JSX.Element {
  return (
    <div>
      <Link className="button" to="/login">
        <span className="buttonText">Sign in</span>
      </Link>
    </div>
  );
}

function JoinLink(): JSX.Element {
  return (
    <div>
      <Link className="button" to="/join">
        <span className="buttonText">Sign up</span>
      </Link>
    </div>
  );
}

export function LandingPage(): JSX.Element {
  const user = useFirebaseAuth();
  return (
    <div>
      <header>Welcome to Battlestar Galactica!</header>
      <div>
        {user ? (
          <OpenAppLink />
        ) : (
          <div>
            <LoginLink />
            <JoinLink />
          </div>
        )}
      </div>
    </div>
  );
}
