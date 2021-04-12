import { useAuth } from '../common/AuthProvider';
import { Page } from '../common/Page';

export function CurrentTablesPage(): JSX.Element {
  const { authInfo } = useAuth();
  return <Page>This is where my current tables go ({authInfo.profile?.email})</Page>;
}
