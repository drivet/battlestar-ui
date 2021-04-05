import { NavLink } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { LogoutLink } from './LogoutLink';

export function CurrentTables(): JSX.Element {
  const { authInfo } = useAuth();

  return (
    <div>
      <NavLink to="/current-tables">Current Games</NavLink>
      <NavLink to="/sent-invites">Sent Invites</NavLink>
      <LogoutLink />
      This is where my current tables go ({authInfo.profile?.email})
    </div>
  );
}
