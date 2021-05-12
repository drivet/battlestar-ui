import { useEffect, useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Page } from '../Page';
import { ReceivedInvitesTab } from './ReceivedInvitesTab';
import { SentInvitesTab } from './SentInvitesTab';
import { Table } from './table-models';
import { deleteTable, getTables } from './table-service';

export function InvitationsPage(): JSX.Element {
  const user = useFirebaseAuth();
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [loading, setIsLoading] = useState<boolean>(true);

  function loadingIndicator() {
    return <div>Loading...</div>;
  }

  function renderTab(): JSX.Element {
    return selectedTab === 0 ? (
      <SentInvitesTab tables={extractSent()} onDelete={handleDelete} onInvite={() => refresh()} />
    ) : (
      <ReceivedInvitesTab tables={extractReceived()} />
    );
  }

  function extractSent(): Table[] {
    return tables.filter((t) => t.owner === user?.uid);
  }

  function extractReceived(): Table[] {
    return tables.filter((t) => t.owner !== user?.uid);
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
      const tables = await getTables(await user.getIdToken(true));
      setTables(tables);
      setIsLoading(false);
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
      {loading ? loadingIndicator() : renderTab()}
    </Page>
  );
}
