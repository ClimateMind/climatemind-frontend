import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ROUTES from '../Router/RouteConfig';
import PageWithAppBar from '../AppBar/PageWithAppBar';
import PageWithAppBottomBar from '../AppBar/PageWithAppBottomBar';
import PageWithVanillaAppBar from '../AppBar/PageWithVanillaAppBar';
// import CookiesDialog from '../CookiesDialog';

import Home from '../../pages/Home';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
// import Error404 from '../../pages/Error404';

import StartQuiz from '../../pages/StartQuiz';
import Quiz from '../../pages/Questionnaire';
import SubmitSetOne from '../../pages/SubmitSetOne';
import SubmitSetTwo from '../../pages/SubmitSetTwo';
import PersonalValues from '../../pages/PersonalValuesFeed';

import Register from '../../pages/Register';
import Login from '../../pages/Login';
import ProfileMenu from '../../pages/ProfileMenu';
import PasswordReset from '../../pages/PasswordReset';

import ClimateFeed from '../../pages/ClimateFeed';
import SolutionsFeed from '../../pages/SolutionsFeed';
import MythFeed from '../../pages/MythFeed';

import ConversationsLanding from '../../pages/ConversationsLanding';
import ShareLink from '../../pages/ConversationsDashboard';
import { SharedValues } from '../../pages/SharedValues';
import { UserASharedFeed } from '../../pages/UserASharedFeed';

import UserBLanding from '../../pages/userB/Landing';
import { CoreValues } from '../../pages/userB/CoreValues';
import HowCMWorks from '../../pages/userB/HowCMWorks';
import { RegisterUserB } from '../../pages/userB/RegisterUserB';
import { Shared } from '../../pages/userB/Shared';
import { SharedImpacts } from '../../pages/userB/SharedImpacts';
import { SharedSolutions } from '../../pages/userB/SharedSolutions';
import { SharedValuesUserB } from '../../pages/userB/SharedValuesUserB';
import ShareSummary from '../../pages/userB/ShareSummary/ShareSummary';
import { NoConsent } from '../../pages/userB/UserBNoConsent';

const router = createBrowserRouter([
  // {
    // path: '/',
    // element: <CookiesDialog onDecline={() => {}} onAccept={() => {}} />,
    // errorElement: <Error404 />,
    // children: [
      {
        path: ROUTES.HOME_PAGE,
        element: <PageWithAppBar component={<Home />} />,
      },
      {
        path: `${ROUTES.PRE_QUIZ_PAGE}/conversationId?`,
        element: <PageWithAppBar component={<StartQuiz />} />,
      },
      {
        path: ROUTES.QUIZ_PAGE,
        element: <Quiz />,
      },
      {
        path: ROUTES.SUBMIT_SET_ONE_PAGE,
        element: <PageWithAppBar component={<SubmitSetOne />} />,
      },
      {
        path: ROUTES.SUBMIT_SET_TWO_PAGE,
        element: <PageWithAppBar component={<SubmitSetTwo />} />,
      },
      {
        path: ROUTES.PERSONAL_VALUES_PAGE,
        element: <PageWithAppBar component={<PersonalValues />} />,
      },
      {
        path: ROUTES.MYTHS_FEED_PAGE,
        element: <PageWithAppBottomBar component={<MythFeed />} />,
      },
      {
        path: ROUTES.SOLUTIONS_FEED_PAGE,
        element: <PageWithAppBottomBar component={<SolutionsFeed />} />,
      },
      {
        path: ROUTES.CLIMATE_FEED_PAGE,
        element: <PageWithAppBottomBar component={<ClimateFeed />} />,
      },
      {
        path: ROUTES.SIGN_UP_PAGE,
        element: <PageWithAppBar component={<Register />} />,
      },

      {
        path: ROUTES.LOGIN_PAGE,
        element: <PageWithAppBar component={<Login />} />,
      },

      {
        path: ROUTES.PASSWORD_RESET_PAGE,
        element: <PageWithVanillaAppBar component={<PasswordReset />} />,
      },

      {
        path: ROUTES.CONVERSATIONS_INTRO_PAGE,
        element: <PageWithAppBottomBar component={<ConversationsLanding />} />,
      },

      {
        path: ROUTES.CONVERSATIONS_PAGE,
        element: <ShareLink />,
      },

      {
        path: ROUTES.PRIVACY_PAGE,
        element: <PageWithAppBar component={<PrivacyPolicy />} />,
      },
      {
        path: ROUTES.PROFILE_PAGE,
        element: <PageWithAppBottomBar component={<ProfileMenu />} />,
      },
      {
        path: `${ROUTES.USERA_SHARED_FEED_PAGE}/:conversationId`,
        element: <PageWithAppBottomBar component={<UserASharedFeed />} />,
      },
      {
        path: `${ROUTES.SHARED_VALUES_PAGE}/:conversationId`,
        element: <PageWithAppBottomBar component={<SharedValues />} />,
      },
      {
        path: `${ROUTES.USERB_LANDING_PAGE}`,
        element: <PageWithAppBar component={<UserBLanding />} />,
      },
      {
        path: `${ROUTES.USERB_CORE_VALUES_PAGE}`,
        element: <PageWithAppBar component={<CoreValues />} />,
      },
      {
        path: `${ROUTES.USERB_HOW_CM_WORKS_PAGE}`,
        element: <PageWithAppBar component={<HowCMWorks />} />,
      },
      {
        path: `${ROUTES.USERB_SIGN_UP_PAGE}`,
        element: <PageWithAppBar component={<RegisterUserB />} />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUCCESS_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<Shared />} />,
      },
      {
        path: `${ROUTES.USERB_SHARED_IMPACTS_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<SharedImpacts />} />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SOLUTIONS_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<SharedSolutions />} />,
      },
      {
        path: `${ROUTES.USERB_SHARED_VALUES_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<SharedValuesUserB />} />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUMMARY_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<ShareSummary />} />,
      },
      {
        path: `${ROUTES.USERB_NO_CONSENT_PAGE}/:conversationId`,
        element: <PageWithAppBar component={<NoConsent />} />,
      },
    // ],
  // }
]);

export default router;
