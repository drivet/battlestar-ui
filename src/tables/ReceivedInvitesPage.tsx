import { useEffect, useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Table } from '../services/table-models';
import { getRecievedInvites } from '../services/table-service';
import { TablePage } from './TablePage';

export function ReceivedInvitesPage(): JSX.Element {
  const user = useFirebaseAuth();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      if (user) {
        setTables(await getRecievedInvites(await user.getIdToken(), user.uid));
      }
    }
    fetchAndSet();
  }, []);

  return <TablePage>Tables {tables ? tables.length : 0}</TablePage>;
}
