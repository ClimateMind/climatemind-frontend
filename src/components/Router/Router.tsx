import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import MeetGuy from '../../pages/MeetGuy';
import ClimatePersonality from '../../pages/ClimatePersonality';
import Quiz from '../../pages/Questionnaire';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import Error404 from '../../pages/Error404';
import SubmitQuestionnaire from '../../pages/SubmitQuestionnaire';
import PersonalValues from '../../pages/PersonalValuesFeed';
import GetZipCode from '../../pages/GetZipCode';
import ClimateFeed from '../../pages/ClimateFeed';
import MythFeed from '../../pages/MythFeed';
import SolutionsFeed from '../../pages/SolutionsFeed';
import ROUTES from '../Router/RouteConfig';
import PageWithAppBar from '../AppBar/PageWithAppBar';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME} render={() => <Home />} />
        <Route
          exact
          path={ROUTES.ROUTE_QUIZHOME}
          render={() => <PageWithAppBar component={<MeetGuy />} />}
        />
        <Route exact path={ROUTES.ROUTE_QUIZHOME} render={() => <MeetGuy />} />
        <Route
          exact
          path={ROUTES.ROUTE_PERSONALITY}
          render={() => <PageWithAppBar component={<ClimatePersonality />} />}
        />
        <Route exact path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
        <Route
          exact
          path={ROUTES.ROUTE_SUBMIT}
          render={() => <PageWithAppBar component={<SubmitQuestionnaire />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_LOCATION}
          render={() => <PageWithAppBar component={<GetZipCode />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_VALUES}
          render={() => <PageWithAppBar component={<PersonalValues />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_MYTHS}
          render={() => <PageWithAppBar component={<MythFeed />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_SOLUTIONS}
          render={() => <PageWithAppBar component={<SolutionsFeed />} />}
        />

        <Route
          path="*"
          render={() => <PageWithAppBar component={<PrivacyPolicy />} />}
        />

        <Route
          exact
          path={ROUTES.ROUTE_FEED}
          render={() => <PageWithAppBar component={<ClimateFeed />} />}
        />
        <Route
          path="*"
          render={() => <PageWithAppBar component={<Error404 />} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
