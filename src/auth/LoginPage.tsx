import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../common/AuthProvider';
import { LocationState } from '../common/models';

export function LoginPage(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/current-games' } };

  const login = () => {
    auth.signIn(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <button onClick={login} className="button">
        <img src="icons/google.svg" />
        <span className="buttonText">Sign in with Google</span>
      </button>
    </div>
  );
}
