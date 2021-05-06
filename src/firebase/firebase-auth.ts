import firebase from 'firebase';
import { useEffect, useState } from 'react';

import { createProfile, getProfile } from '../profiles/profile-service';

export type NullableUser = firebase.User | null | undefined;

export function useFirebaseAuth(): NullableUser {
  const [user, setUser] = useState<NullableUser>(undefined);

  function doIt(user: NullableUser) {
    setUser(user);
    if (user) {
      establishProfile(user);
    }
  }

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => doIt(user));
    return () => unregisterAuthObserver();
  }, []);
  return user;
}

async function establishProfile(user: firebase.User): Promise<void> {
  const authToken = await user.getIdToken();
  const profile = await getProfile(authToken, user.uid);
  if (!profile) {
    createProfile(authToken, user.uid, makeNickname(user));
  }
}

// there is surely a better way to to this, but whatever
function makeNickname(user: firebase.User): string {
  const email = user.email;
  if (!email) {
    throw new Error('Cannot make nickname without email');
  }
  const splitEmail = email.match(/^([^@]*)@/);
  if (!splitEmail || splitEmail.length !== 2) {
    throw new Error(`Email is badely formed: ${email}`);
  }
  const name = splitEmail[1];
  const ts = Date.now();
  return `${name}-${ts}`;
}
