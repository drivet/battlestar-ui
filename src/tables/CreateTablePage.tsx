import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Page } from '../Page';
import { createTable } from '../services/table-service';

export function CreateTablePage(): JSX.Element {
  const [players, setPlayers] = useState(3);
  const [bots, setBots] = useState(0);
  const user = useFirebaseAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      throw new Error('user not signed in');
    }
    await createTable(await user.getIdToken(true), user.uid, players, bots);
    history.push('/invitations');
  }

  return (
    <Page>
      <h1 className="title">New table</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <label className="label" htmlFor="players">
            Number of players (between 3 and 6):
          </label>
          <input
            className="input"
            type="number"
            name="players"
            placeholder="How many players?"
            min={'3'}
            max={'6'}
            onChange={(e) => setPlayers(Number(e.target.value))}
            value={players}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="bots">
            Number of bots (up to one less than players):
          </label>
          <input
            className="input"
            type="number"
            name="players"
            placeholder="How many bots?"
            min={'0'}
            max={'5'}
            onChange={(e) => setBots(Number(e.target.value))}
            value={bots}
          />
        </div>
        <button className="button">Create</button>
      </form>
    </Page>
  );
}
