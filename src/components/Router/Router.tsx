import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import MeetGuy from '../../pages/MeetGuy';
import Quiz from '../../pages/Questionaire';
import ROUTES from '../Router/RouteConfig';

// To Do - How do we unit test this.

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME} render={() => <Home />} />
        <Route path={ROUTES.ROUTE_QUIZHOME} render={() => <MeetGuy />} />
        <Route path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
