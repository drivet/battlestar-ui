import { Location } from 'history';
import { Redirect, Route } from 'react-router-dom';

import { LocationState } from '../utils/models';
import { useAuth } from './AuthProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function redirectFrom(location: Location<LocationState>): JSX.Element {
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function PrivateRoute({ children, ...rest }): JSX.Element {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.authInfo.profile ? children : redirectFrom(location as Location<LocationState>)
      }
    />
  );
}
