import { Link } from 'react-router-dom';

export function LandingPage(): JSX.Element {
  return (
    <div>
      <h1>Welcome to Battlestar Galactica Online!</h1>
      <div>
        <Link to="/invitations">Open</Link>
        <Link to="/join">Sign up</Link>
      </div>
    </div>
  );
}
