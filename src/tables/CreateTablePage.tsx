import { useState } from 'react';

import { useAuth } from '../common/AuthProvider';
import { createTable } from '../services/table-service';
import { TablePage } from './TablePage';

export function CreateTablePage(): JSX.Element {
  const [players, setPlayers] = useState(3);
  const [bots, setBots] = useState(0);
  const { authInfo } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!authInfo.authToken || !authInfo.profile) {
      throw new Error('missing auth info');
    }
    createTable(authInfo.authToken, authInfo.profile.id, players, bots);
  }

  return (
    <TablePage>
      <h1>New table</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="players">Number of players (between 3 and 6):</label>
        <input
          type="number"
          name="players"
          placeholder="How many players?"
          min={'3'}
          max={'6'}
          onChange={(e) => setPlayers(Number(e.target.value))}
          value={players}
        />
        <label htmlFor="bots">Number of bots (up to one less than players):</label>
        <input
          type="number"
          name="players"
          placeholder="How many bots?"
          min={'2'}
          max={'5'}
          onChange={(e) => setBots(Number(e.target.value))}
          value={bots}
        />
        <button>Create</button>
      </form>
    </TablePage>
  );
}
