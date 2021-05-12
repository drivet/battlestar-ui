import firebase from 'firebase';
import { useEffect, useState } from 'react';

export type NullableUser = firebase.User | null | undefined;

export function useFirebaseAuth(): NullableUser {
  const [user, setUser] = useState<NullableUser>(undefined);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => setUser(user));
    return () => unregisterAuthObserver();
  }, []);
  return user;
}
