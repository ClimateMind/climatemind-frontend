import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import MeetGuy from '../../pages/MeetGuy';
import CMAppBar from '../AppBar/AppBar';
import ClimatePersonality from '../../pages/ClimatePersonality';
import Quiz from '../../pages/Questionnaire';
import Error404 from '../../pages/Error404';
import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';
import PersonalValues from '../../pages/PersonalValuesFeed';
import ClimateFeed from '../../pages/ClimateFeed';
import ROUTES from '../Router/RouteConfig';

const Router = () => {
  return (
    <BrowserRouter>
      {/* Switch ensures app bar not displayed on landing screen */}
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME}>
          <Home />
        </Route>
        <Route path={ROUTES.ROUTE_HOME}>
          <CMAppBar />
        </Route>
      </Switch>

      <Switch>
        <Route exact path={ROUTES.ROUTE_QUIZHOME} render={() => <MeetGuy />} />
        <Route exact path={ROUTES.ROUTE_QUIZHOME} render={() => <MeetGuy />} />
        {/* <CMAppBar /> */}
        <Route
          exact
          path={ROUTES.ROUTE_PERSONALITY}
          render={() => <ClimatePersonality />}
        />
        <Route exact path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
        <Route
          exact
          path={ROUTES.ROUTE_SUBMIT}
          render={() => <SubmitQuestionnaire />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_VALUES}
          render={() => <PersonalValues />}
        />
        <Route exact path={ROUTES.ROUTE_FEED} render={() => <ClimateFeed />} />
        <Route render={() => <Error404 />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
