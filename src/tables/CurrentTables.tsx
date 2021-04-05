import { useAuth } from '../auth/AuthProvider';

export function CurrentTables(): JSX.Element {
  const [auth] = useAuth();
  return <div>This is where my current tables go ({auth.profile?.email})</div>;
}
