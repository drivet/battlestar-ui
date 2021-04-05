import { useHistory, useLocation } from 'react-router-dom';

import { LocationState } from '../utils/models';
import { useAuth } from './AuthProvider';

export function Login(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/current-tables' } };

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
