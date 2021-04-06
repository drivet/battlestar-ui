import { NavLink } from 'react-router-dom';

import { useAuth } from '../common/AuthProvider';
import { LogoutLink } from './LogoutLink';

export function SentInvitesPage(): JSX.Element {
  const { authInfo } = useAuth();
  return (
    <div>
      <NavLink to="/current-games">Current Games</NavLink>
      <NavLink to="/sent-invites">Sent Invites</NavLink>
      <LogoutLink />
      This is where my sent invites go ({authInfo.profile?.email})
    </div>
  );
}
