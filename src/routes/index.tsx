import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROUTES_CONFIG } from './routes';

const CookiesDialog = lazy(
  () => import('../components/CookiesDialog')
);
const Home = lazy(() => import('../pages/Home'));
const ClimateFeed = lazy(() => import('../pages/ClimateFeed'));
const ConversationsDashboard = lazy(
  () => import('../pages/ConversationsDashboard')
);
const ConversationsLanding = lazy(
  () => import('../pages/ConversationsLanding')
);
const Error404 = lazy(() => import('../pages/Error404'));
const DevMenu = lazy(() => import('../pages/dev/DevMenu'));
const GetZipCode = lazy(() => import('../pages/GetZipCode'));
const Login = lazy(() => import('../pages/Login'));
const MythFeed = lazy(() => import('../pages/MythFeed'));
const PersonalValuesFeed = lazy(
  () => import('../pages/PersonalValuesFeed')
);
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const ProfileMenu = lazy(() => import('../pages/ProfileMenu'));
const Questionnaire = lazy(() => import('../pages/Questionnaire'));
const Register = lazy(() => import('../pages/Register'));
const SolutionsFeed = lazy(() => import('../pages/SolutionsFeed'));
const StartQuiz = lazy(() => import('../pages/StartQuiz'));
const SharedValues = lazy(() => import('../pages/SharedValues'));
const SubmitSetOne = lazy(() => import('../pages/SubmitSetOne'));
const SubmitSetTwo = lazy(() => import('../pages/SubmitSetTwo'));
const CoreValues = lazy(() => import('../pages/userB/CoreValues'));
const HowCMWorks = lazy(() => import('../pages/userB/HowCMWorks'));
const UserBLanding = lazy(() => import('../pages/userB/Landing'));
const RegisterUserB = lazy(
  () => import('../pages/userB/RegisterUserB')
);
const Shared = lazy(() => import('../pages/userB/Shared'));
const SharedImpacts = lazy(
  () => import('../pages/userB/SharedImpacts')
);
const SharedSolutions = lazy(
  () => import('../pages/userB/SharedSolutions')
);
const SharedValuesUserB = lazy(
  () => import('../pages/userB/SharedValuesUserB')
);
const ShareSummary = lazy(
  () => import('../pages/userB/ShareSummary')
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Route path="/" render={() => <CookiesDialog />} />
        <Switch>
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_HOME}
            render={() => <Home />}
          />

          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_PERSONALITY}
            render={() => <StartQuiz />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_QUIZ}
            render={() => <Questionnaire />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_SUBMIT}
            render={() => <SubmitSetOne />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_SUBMIT_SET_TWO}
            render={() => <SubmitSetTwo />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_LOCATION}
            render={() => <GetZipCode />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_VALUES}
            render={() => <PersonalValuesFeed />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_MYTHS}
            render={() => <MythFeed />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_SOLUTIONS}
            render={() => <SolutionsFeed />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_FEED}
            render={() => <ClimateFeed />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_REGISTER}
            render={() => <Register />}
          />

          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_LOGIN}
            render={() => <Login />}
          />

          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_CONVERSATIONS}
            render={() => <ConversationsLanding />}
          />

          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_SHARE_LINK}
            render={() => <ConversationsDashboard />}
          />

          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_PRIVACY}
            render={() => <PrivacyPolicy />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.PROFILE_MENU}
            render={() => <ProfileMenu />}
          />

          {/* USER B */}
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_LANDING}
            render={() => <UserBLanding />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.ROUTE_HOW_CM_WORKS}
            render={() => <HowCMWorks />}
          />
          <Route
            path={ROUTES_CONFIG.USERB_CORE_VALUES}
            render={() => <CoreValues />}
          />
          <Route
            path={ROUTES_CONFIG.SHARED_VALUES}
            render={() => <SharedValues />}
          />
          <Route
            path={ROUTES_CONFIG.USERB_SHARED_VALUES}
            render={() => <SharedValuesUserB />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.USERB_SHARED_IMPACTS}
            render={() => <SharedImpacts />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.USERB_SHARED_SOLUTIONS}
            render={() => <SharedSolutions />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.USERB_ROUTE_REGISTER}
            render={() => <RegisterUserB />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.USERB_SHARED_SUMMARY}
            render={() => <ShareSummary />}
          />
          <Route
            exact
            path={ROUTES_CONFIG.USERB_SHARED_SUCCESS}
            render={() => <Shared />}
          />
          <Route exact path={'/dev'} render={() => <DevMenu />} />
          <Route path="*" render={() => <Error404 />} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
