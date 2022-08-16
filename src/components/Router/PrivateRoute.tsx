import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import ROUTES from '../Router/RouteConfig';

export function PrivateRoute({ children, ...rest }: any) {
  const { isLoggedIn } = useAuth();
  return (
        <Route
          {...rest}
          render={({ location }) => {
            return isLoggedIn ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: ROUTES.ROUTE_LOGIN,
                  state: { from: location },
                }}
              />
            );
          }}
        />
  );
}
