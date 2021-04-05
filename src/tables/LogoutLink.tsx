import { useHistory } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';

export function LogoutLink(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth.signOut(() => {
      history.replace({ pathname: '/' });
    });
  };

  return (
    <div>
      <button onClick={logout} className="button">
        <span className="buttonText">Sign out</span>
      </button>
    </div>
  );
}
