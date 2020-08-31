import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import QuizWelcome from '../../pages/QuizWelcome';
import Quiz from '../../pages/Quiz';
import ROUTES from '../Router/RouteConfig';

// To Do - How do we unit test this.

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME} render={() => <Home />} />
        <Route path={ROUTES.ROUTE_QUIZHOME} render={() => <QuizWelcome />} />
        <Route path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
