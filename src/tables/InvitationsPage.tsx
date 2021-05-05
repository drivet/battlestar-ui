import { useEffect, useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Page } from '../Page';
import { Table } from '../services/table-models';
import { deleteTable, getTables } from '../services/table-service';
import { ReceivedInvitesTab } from './ReceivedInvitesTab';
import { SentInvitesTab } from './SentInvitesTab';

export function InvitationsPage(): JSX.Element {
  const user = useFirebaseAuth();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [loading, setIsLoading] = useState<boolean>(false);

  function renderTab(): JSX.Element {
    return selectedTab === 0 ? (
      <SentInvitesTab tables={extractSent()} onDelete={handleDelete} />
    ) : (
      <ReceivedInvitesTab tables={extractReceived()} />
    );
  }

  function extractSent(): Table[] {
    return tables.filter((t) => t.inviter === user?.uid);
  }

  function extractReceived(): Table[] {
    return tables.filter((t) => t.inviter !== user?.uid);
  }

  async function handleDelete(tableId: string) {
    if (!user) {
      console.warn('Trying to delete table with null user');
      return;
    }
    await deleteTable(await user.getIdToken(true), tableId);
    refresh();
  }

  async function refresh() {
    if (user) {
      setIsLoading(true);
      const tables = await getTables(await user.getIdToken(true));
      setIsLoading(false);
      setTables(tables);
    }
  }

  useEffect(() => {
    refresh();
  }, [user ? user.uid : undefined]);

  return (
    <Page>
      <div className="tabs">
        <ul>
          <li className={selectedTab === 0 ? 'is-active' : ''}>
            <a onClick={() => setSelectedTab(0)}>Sent</a>
          </li>
          <li className={selectedTab === 1 ? 'is-active' : ''}>
            <a onClick={() => setSelectedTab(1)}>Received</a>
          </li>
        </ul>
      </div>

      {loading ? (
        <span className="icon">
          <i className="fas fa-spinner"></i>
        </span>
      ) : (
        renderTab()
      )}
    </Page>
  );
}
