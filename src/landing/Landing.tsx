import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';

function OpenAppLink(): JSX.Element {
  return (
    <div>
      <Link className="button" to="/current-tables">
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

export function Landing(): JSX.Element {
  const auth = useAuth();

  return (
    <div>
      <header>Welcome to Battlestar Galactica!</header>
      <div>{auth.authInfo.isAuthenticated ? <OpenAppLink /> : <LoginLink />}</div>
    </div>
  );
}
