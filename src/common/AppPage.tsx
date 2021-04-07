import { NavLink, useHistory } from 'react-router-dom';

import { useAuth } from '../common/AuthProvider';

export function LogoutLink(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth.signOut(() => {
      history.replace({ pathname: '/' });
    });
  };

  return (
    <button onClick={logout} className="button">
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export const AppPage: React.FC = ({ children }) => {
  return (
    <div className="wrapper">
      <NavLink to="/current-games">Current Games</NavLink>
      <NavLink to="/sent-invites">Sent Invites</NavLink>
      <LogoutLink />
      {children}
    </div>
  );
};
