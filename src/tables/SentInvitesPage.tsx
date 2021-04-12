import { useAuth } from '../common/AuthProvider';
import { Page } from '../common/Page';

export function SentInvitesPage(): JSX.Element {
  const { authInfo } = useAuth();
  return <Page>This is where my sent invites go ({authInfo.profile?.email})</Page>;
}
