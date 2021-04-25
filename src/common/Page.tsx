import { NavLink, useHistory } from 'react-router-dom';

import { useAuth } from './AuthProvider';

export function LogoutLink(): JSX.Element {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth?.signOut(() => {
      history.replace({ pathname: '/' });
    });
  };

  return (
    <button onClick={logout} className="logoutLink">
      <span className="logoutLink__buttonText">Sign out</span>
    </button>
  );
}

export const Page: React.FC = ({ children }) => {
  return (
    <div className="page">
      <nav className="nav page__nav">
        <NavLink to="/current-games" className="nav__item">
          Current Games
        </NavLink>
        <NavLink to="/sent-invites" className="nav__item">
          Sent Invites
        </NavLink>
        <NavLink to="/received-invites" className="nav__item">
          Received Invites
        </NavLink>
        <div className="nav__item">
          <LogoutLink />
        </div>
      </nav>
      <main className="main page__main">{children}</main>
    </div>
  );
};
