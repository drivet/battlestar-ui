import { AppPage } from '../common/AppPage';
import { useAuth } from '../common/AuthProvider';

export function CurrentTablesPage(): JSX.Element {
  const { authInfo } = useAuth();
  return <AppPage>This is where my current tables go ({authInfo.profile?.email})</AppPage>;
}
