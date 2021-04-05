import { useAuth } from '../auth/AuthProvider';
import { AuthButton } from './AuthButton';
import { OpenApp } from './OpenApp';

export function Landing(): JSX.Element {
  const [authInfo, setAuthInfo] = useAuth();

  return (
    <div>
      <header>Welcome to Battlestar Galactica!</header>
      <div>{authInfo.isAuthenticated ? <AuthButton setAuthInfo={setAuthInfo} /> : <OpenApp />}</div>
    </div>
  );
}
