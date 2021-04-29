import { useEffect, useState } from 'react';

import { useAuth } from '../common/AuthProvider';
import { Table } from '../services/table-models';
import { getCurrentTables } from '../services/table-service';
import { TablePage } from './TablePage';

export function CurrentTablesPage(): JSX.Element {
  const { authInfo } = useAuth();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      if (!authInfo.authToken || !authInfo.profile) {
        return;
      }
      setTables(await getCurrentTables(authInfo.authToken, authInfo.profile.id));
    }
    fetchAndSet();
  }, []);

  return <TablePage>Tables {tables ? tables.length : 0}</TablePage>;
}
