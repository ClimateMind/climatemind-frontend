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
import ConversationsLanding from '../../pages/ConversationsLanding';
import CookiesDialog from '../CookiesDialog';
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import ShareLink from '../../pages/ConversationsDashboard';
import UserBLanding from '../../pages/userB/Landing';
import ProfileMenu from '../../pages/ProfileMenu';
import HowCMWorks from '../../pages/userB/HowCMWorks';
import { CoreValues } from '../../pages/userB/CoreValues';
import { SharedValues } from '../../pages/SharedValues';
import { SharedImpacts } from '../../pages/userB/SharedImpacts';
import PageWithVanillaAppBar from '../AppBar/PageWithVanillaAppBar';
import { DevMenu } from '../../pages/dev/DevMenu';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <CookiesDialog />} />
      <Switch>
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
          path={ROUTES.ROUTE_REGISTER}
          render={() => <PageWithAppBar component={<Register />} />}
        />

        <Route
          exact
          path={ROUTES.ROUTE_LOGIN}
          render={() => <PageWithAppBar component={<Login />} />}
        />

        <Route
          exact
          path={ROUTES.ROUTE_CONVERSATIONS}
          render={() => (
            <PageWithAppBottomBar component={<ConversationsLanding />} />
          )}
        />

        <Route
          exact
          path={ROUTES.ROUTE_SHARE_LINK}
          render={() => <PageWithAppBottomBar component={<ShareLink />} />}
        />

        <Route
          exact
          path={ROUTES.ROUTE_PRIVACY}
          render={() => <PageWithAppBar component={<PrivacyPolicy />} />}
        />
        <Route
          exact
          path={ROUTES.PROFILE_MENU}
          render={() => <PageWithAppBottomBar component={<ProfileMenu />} />}
        />

        {/* USER B */}
        <Route
          exact
          path={ROUTES.ROUTE_LANDING}
          render={() => <UserBLanding />}
        />
        <Route
          exact
          path={ROUTES.ROUTE_HOW_CM_WORKS}
          render={() => <PageWithVanillaAppBar component={<HowCMWorks />} />}
        />
        <Route path={ROUTES.USERB_CORE_VALUES} render={() => <CoreValues />} />
        <Route
          path={ROUTES.USERB_SHARED_VALUES}
          render={() => <PageWithVanillaAppBar component={<SharedValues />} />}
        />
        <Route
          exact
          path={ROUTES.USERB_SHARED_IMPACTS}
          render={() => <PageWithVanillaAppBar component={<SharedImpacts />} />}
        />

        {/* Dev Menu */}
        <Route exact path={'/dev'} render={() => <DevMenu />} />

        {/* FALLBACK */}
        <Route
          path="*"
          render={() => <PageWithAppBar component={<Error404 />} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
