import { Link } from 'react-router-dom';

import { useAuth } from '../common/AuthProvider';

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
        <span className="buttonText">Login</span>
      </Link>
    </div>
  );
}

export function LandingPage(): JSX.Element {
  const auth = useAuth();

  return (
    <div>
      <header>Welcome to Battlestar Galactica!</header>
      <div>{auth?.authInfo?.isAuthenticated ? <OpenAppLink /> : <LoginLink />}</div>
    </div>
  );
}
