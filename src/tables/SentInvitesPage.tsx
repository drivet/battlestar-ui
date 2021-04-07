import { AppPage } from '../common/AppPage';
import { useAuth } from '../common/AuthProvider';

export function SentInvitesPage(): JSX.Element {
  const { authInfo } = useAuth();
  return <AppPage>This is where my sent invites go ({authInfo.profile?.email})</AppPage>;
}
