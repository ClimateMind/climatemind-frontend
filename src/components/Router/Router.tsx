import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import MeetGuy from '../../pages/MeetGuy';
import CMAppBar from '../ CMAppBar';
import ClimatePersonality from '../../pages/ClimatePersonality';
import Quiz from '../../pages/Questionnaire';
import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';
import PersonalValues from '../../pages/PersonalValuesFeed';
import ClimateFeed from '../../pages/ClimateFeed';
import ROUTES from '../Router/RouteConfig';

// To Do - How do we unit test this.

const Router = () => {
  return (
    <BrowserRouter>
      <CMAppBar />
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME} render={() => <Home />} />
        <Route path={ROUTES.ROUTE_QUIZHOME} render={() => <MeetGuy />} />
        <Route
          path={ROUTES.ROUTE_PERSONALITY}
          render={() => <ClimatePersonality />}
        />
        <Route path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
        <Route
          path={ROUTES.ROUTE_SUBMIT}
          render={() => <SubmitQuestionnaire />}
        />
        <Route path={ROUTES.ROUTE_VALUES} render={() => <PersonalValues />} />
        <Route path={ROUTES.ROUTE_FEED} render={() => <ClimateFeed />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
