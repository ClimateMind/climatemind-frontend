import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ClimateFeed from '../../pages/ClimateFeed';
import ShareLink from '../../pages/ConversationsDashboard';
import ConversationsLanding from '../../pages/ConversationsLanding';
import { DevMenu } from '../../pages/dev/DevMenu';
import Error404 from '../../pages/Error404';
import GetZipCode from '../../pages/GetZipCode';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import MythFeed from '../../pages/MythFeed';
import PersonalValues from '../../pages/PersonalValuesFeed';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import ProfileMenu from '../../pages/ProfileMenu';
import Quiz from '../../pages/Questionnaire';
import Register from '../../pages/Register';
import { SharedValues } from '../../pages/SharedValues';
import SolutionsFeed from '../../pages/SolutionsFeed';
import StartQuiz from '../../pages/StartQuiz';
import SubmitSetOne from '../../pages/SubmitSetOne';
import SubmitSetTwo from '../../pages/SubmitSetTwo';
import { CoreValues } from '../../pages/userB/CoreValues';
import HowCMWorks from '../../pages/userB/HowCMWorks';
import UserBLanding from '../../pages/userB/Landing';
import { RegisterUserB } from '../../pages/userB/RegisterUserB';
import { Shared } from '../../pages/userB/Shared';
import { SharedImpacts } from '../../pages/userB/SharedImpacts';
import { SharedSolutions } from '../../pages/userB/SharedSolutions';
import { SharedValuesUserB } from '../../pages/userB/SharedValuesUserB';
import { UserASharedFeed } from '../../pages/UserASharedFeed';
import ShareSummary from '../../pages/userB/ShareSummary/ShareSummary';
import PageWithAppBar from '../AppBar/PageWithAppBar';
import PageWithAppBottomBar from '../AppBar/PageWithAppBottomBar';
import PageWithVanillaAppBar from '../AppBar/PageWithVanillaAppBar';
import CookiesDialog from '../CookiesDialog';
import ROUTES from '../Router/RouteConfig';

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
        <Route
          exact
          path={`${ROUTES.USERA_SHARED_FEED}/:conversationId`}
          render={() => (
            <PageWithAppBottomBar component={<UserASharedFeed />} />
          )}
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
          path={`${ROUTES.SHARED_VALUES}/:alignmentScoresId`}
          render={() => <PageWithVanillaAppBar component={<SharedValues />} />}
        />
        <Route
          path={`${ROUTES.USERB_SHARED_VALUES}/:alignmentScoresId`}
          render={() => (
            <PageWithVanillaAppBar component={<SharedValuesUserB />} />
          )}
        />
        <Route
          exact
          path={ROUTES.USERB_SHARED_IMPACTS}
          render={() => <PageWithVanillaAppBar component={<SharedImpacts />} />}
        />
        <Route
          exact
          path={ROUTES.USERB_SHARED_SOLUTIONS}
          render={() => (
            <PageWithVanillaAppBar component={<SharedSolutions />} />
          )}
        />
        <Route
          exact
          path={ROUTES.USERB_ROUTE_REGISTER}
          render={() => <PageWithAppBar component={<RegisterUserB />} />}
        />
        <Route
          exact
          path={ROUTES.USERB_SHARED_SUMMARY}
          render={() => <PageWithVanillaAppBar component={<ShareSummary />} />}
        />
        <Route
          exact
          path={ROUTES.USERB_SHARED_SUCCESS}
          render={() => <PageWithVanillaAppBar component={<Shared />} />}
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
