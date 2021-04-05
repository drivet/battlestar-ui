import { Link } from 'react-router-dom';

export function OpenApp(): JSX.Element {
  return (
    <div>
      <Link className="button" to="/current-tables">
        Open App
      </Link>
    </div>
  );
}
