import { useEffect, useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Page } from '../Page';
import { Username } from '../profiles/profile-models';
import { ReceivedInvitesTab } from './ReceivedInvitesTab';
import { SentInvitesTab } from './SentInvitesTab';
import { Invite, InviteStatus, Table } from './table-models';
import { createInvite, deleteInvite, deleteTable, getTables, updateInvite } from './table-service';

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
      <SentInvitesTab
        tables={extractSent()}
        onTableDelete={handleTableDelete}
        onInvite={handleRecipientSelect}
        onInviteDelete={handleInviteDelete}
      />
    ) : (
      <ReceivedInvitesTab tables={extractReceived()} onInviteUpdate={handleInviteUpdate} />
    );
  }

  function extractSent(): Table[] {
    return tables.filter((t) => t.owner === user?.uid);
  }

  function extractReceived(): Table[] {
    return tables.filter((t) => t.owner !== user?.uid);
  }

  async function handleInviteUpdate(table: Table, recipient: string, status: InviteStatus) {
    if (!user) {
      return;
    }
    await updateInvite(table._id, recipient, { status });
    refresh();
  }

  async function handleTableDelete(tableId: string) {
    if (!user) {
      return;
    }
    await deleteTable(tableId);
    refresh();
  }

  async function handleInviteDelete(table: Table, invite: Invite) {
    if (!user) {
      return;
    }
    await deleteInvite(table._id, invite.recipient);
    refresh();
  }

  async function handleRecipientSelect(table: Table, recipient: Username): Promise<void> {
    if (!user) {
      return;
    }
    await createInvite(table._id, recipient._id, {
      recipientUsername: recipient.username,
    });
    refresh();
  }

  async function refresh() {
    if (user) {
      const tables = await getTables();
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
