import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home';
import StartQuiz from '../../pages/StartQuiz';
import Quiz from '../../pages/Questionnaire';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import Error404 from '../../pages/Error404';
import SubmitSetOne from '../../pages/SubmitSetOne';
import SubmitSetTwo from '../../pages/SubmitSetTwo';
import PersonalValues from '../../pages/PersonalValuesFeed';
import GetZipCode from '../../pages/GetZipCode';
import ClimateFeed from '../../pages/ClimateFeed';
import MythFeed from '../../pages/MythFeed';
import SolutionsFeed from '../../pages/SolutionsFeed';
import ROUTES from '../Router/RouteConfig';
import PageWithAppBar from '../AppBar/PageWithAppBar';
import PageWithAppBottomBar from '../AppBar/PageWithAppBottomBar';
import ConversationsPage from '../../pages/Conversations';
import CookiesDialog from '../CookiesDialog';
import Page from '../../pages/Page';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <CookiesDialog />} />
      <Switch>
        <Route exact path={ROUTES.ROUTE_HOME} render={() => <Home />} />
        <Route exact path="/chart" render={() => <Page />} />

        <Route
          exact
          path={ROUTES.ROUTE_HOME}
          render={() => <PageWithAppBar component={<Home />} />}
        />

        <Route
          exact
          path={ROUTES.ROUTE_PERSONALITY}
          render={() => <PageWithAppBar component={<StartQuiz />} />}
        />
        <Route exact path={ROUTES.ROUTE_QUIZ} render={() => <Quiz />} />
        <Route
          exact
          path={ROUTES.ROUTE_SUBMIT}
          render={() => <PageWithAppBar component={<SubmitSetOne />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_SUBMIT_SET_TWO}
          render={() => <PageWithAppBar component={<SubmitSetTwo />} />}
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
          render={() => <PageWithAppBottomBar component={<MythFeed />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_SOLUTIONS}
          render={() => <PageWithAppBottomBar component={<SolutionsFeed />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_FEED}
          render={() => <PageWithAppBottomBar component={<ClimateFeed />} />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_CONVERSATIONS}
          render={() => (
            <PageWithAppBottomBar component={<ConversationsPage />} />
          )}
        />
        <Route
          exact
          path={ROUTES.ROUTE_PRIVACY}
          render={() => <PageWithAppBar component={<PrivacyPolicy />} />}
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
