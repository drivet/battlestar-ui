import { useEffect, useState } from 'react';

import { useAuth } from '../common/AuthProvider';
import { Page } from '../common/Page';
import { Table } from '../services/table-models';
import { getRecievedInvites } from '../services/table-service';

export function ReceivedInvitesPage(): JSX.Element {
  const { authInfo } = useAuth();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      if (!authInfo.authToken || !authInfo.profile) {
        return;
      }
      setTables(await getRecievedInvites(authInfo.authToken, authInfo.profile.id));
    }
    fetchAndSet();
  }, []);

  return <Page>Tables {tables ? tables.length : 0}</Page>;
}
