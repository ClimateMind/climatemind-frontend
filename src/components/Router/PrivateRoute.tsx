import React from 'react';
import { useUrlParamQuery } from '../../hooks/useUrlParamQuery';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import ROUTES from '../Router/RouteConfig';

export function PrivateRoute({ children, ...rest }: any) {
  const query = useUrlParamQuery();
  const { isLoggedIn, isLoading } = useAuth();

  // If no conversationId is provided in the url, just display the usual sharelink route
  if (!query.get('conversation')) {
    return <Route exact {...rest} render={() => children} />;
  }

  // Otherwise, we want to direct the user to the right conversation card
  // First, wait for the auth stuff to recognize if the user is already logged in or not
  if (!isLoggedIn && !isLoading) {
    // If the user is not logged in, first direct them to the login page
    return (
      <Route
        {...rest}
        render={({ location }) => {
          return (
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
  } else if (isLoggedIn) {
    // Display the right conversation card
    return <Route {...rest} render={() => children} />;
  } else {
    return null;
  }
}
