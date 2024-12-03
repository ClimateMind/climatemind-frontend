import { createBrowserRouter } from 'react-router-dom';

import ROUTES from './RouteConfig';

import RootPage from 'pages/SharedPages/RootPage';
import HomePage from '../pages/UserAUnauthorizedPages/HomePage';
import PrivacyPolicyPage from '../pages/SharedPages/PrivacyPolicyPage';

import PreQuizPage from '../pages/UserAUnauthorizedPages/PreQuizPage';
import QuizPage from '../pages/SharedPages/QuizPage';
import SubmitSetOnePage from '../pages/SharedPages/SubmitSetOnePage';
import SubmitSetTwoPage from '../pages/SharedPages/SubmitSetTwoPage';
import PersonalValuesPage from '../pages/SharedPages/PersonalValuesPage';

import SignUpPage from '../pages/UserAUnauthorizedPages/SignUpPage';
import LoginPage from '../pages/UserAUnauthorizedPages/LoginPage';
import ProfilePage from '../pages/UserAAuthorizedPages/ProfilePage';
import PasswordResetPage from '../pages/UserAUnauthorizedPages/PasswordResetPage';

import ClimateFeedPage from '../pages/UserAAuthorizedPages/ClimateFeedPage';
import SolutionsFeedPage from '../pages/UserAAuthorizedPages/SolutionsFeedPage';
import MythsFeedPage from '../pages/UserAAuthorizedPages/MythsFeedPage';

import ConversationsIntroPage from '../pages/UserAAuthorizedPages/ConversationsIntroPage';
import ConversationsPage from '../pages/UserAAuthorizedPages/ConversationsPage';
import SharedValuesPage from '../pages/UserAAuthorizedPages/SharedValuesPage';
import SharedFeedPage from '../pages/UserAAuthorizedPages/SharedFeedPage';

import UserBLandingPage from '../pages/UserBPages/UserBLandingPage';
import UserBLoginPage from 'pages/UserBPages/UserBLoginPage';
import UserBCoreValuesPage from '../pages/UserBPages/UserBCoreValuesPage';
import UserBHowCmWorksPage from '../pages/UserBPages/UserBHowCmWorksPage';
import QuizPageUserB from 'pages/UserBPages/QuizPageUserB';
import UserBSignUpPage from '../pages/UserBPages/UserBSignUpPage';
import UserBSharedSuccessPage from '../pages/UserBPages/UserBSharedSuccessPage';
import UserBSharedImpactsPage from '../pages/UserBPages/UserBSharedImpactsPage';
import UserBSharedSolutionsPage from '../pages/UserBPages/UserBSharedSolutionsPage';
import UserBSharedValuesPage from '../pages/UserBPages/UserBSharedValuesPage';
import UserBSharedSummaryPage from '../pages/UserBPages/UserBSharedSummaryPage';
import UserBNoConsentPage from '../pages/UserBPages/UserBNoConsentPage';
import Error404Page from 'pages/SharedPages/Error404Page';
import AuthorizedPage from 'pages/SharedPages/AuthorizedPage';
import UnauthorizedPage from 'pages/UserAUnauthorizedPages/UnauthorizedPage';
import BadgePage from 'pages/UserAAuthorizedPages/BadgePage';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootPage />,
    errorElement: <Error404Page />,
    children: [
      // UserA unauthorized pages
      {
        path: '',
        element: <UnauthorizedPage />,
        children: [
          {
            path: ROUTES.HOME_PAGE,
            element: <HomePage />,
          },
          {
            path: ROUTES.PRE_QUIZ_PAGE,
            element: <PreQuizPage />,
          },
          {
            path: ROUTES.SIGN_UP_PAGE,
            element: <SignUpPage />,
          },
          {
            path: ROUTES.LOGIN_PAGE,
            element: <LoginPage />,
          },
          {
            path: `${ROUTES.PASSWORD_RESET_PAGE}/:passwordResetLinkUuid`,
            element: <PasswordResetPage />,
          },
        ],
      },

      // UserA shared pages
      {
        path: ROUTES.QUIZ_PAGE,
        element: <QuizPage />,
      },
      {
        path: ROUTES.SUBMIT_SET_ONE_PAGE,
        element: <SubmitSetOnePage />,
      },
      {
        path: ROUTES.SUBMIT_SET_TWO_PAGE,
        element: <SubmitSetTwoPage />,
      },
      {
        path: ROUTES.PERSONAL_VALUES_PAGE,
        element: <PersonalValuesPage />,
      },
      {
        path: ROUTES.CONVERSATIONS_INTRO_PAGE,
        element: <ConversationsIntroPage />,
      },
      {
        path: ROUTES.PRIVACY_PAGE,
        element: <PrivacyPolicyPage />,
      },

      // UserA authorized pages
      {
        path: '',
        element: <AuthorizedPage />,
        children: [
          {
            path: ROUTES.CLIMATE_FEED_PAGE,
            element: <ClimateFeedPage />,
          },
          {
            path: ROUTES.SOLUTIONS_FEED_PAGE,
            element: <SolutionsFeedPage />,
          },
          {
            path: ROUTES.MYTHS_FEED_PAGE,
            element: <MythsFeedPage />,
          },
          {
            path: ROUTES.CONVERSATIONS_PAGE,
            element: <ConversationsPage />,
          },
          {
            path: `${ROUTES.USERA_SHARED_FEED_PAGE}/:conversationId`,
            element: <SharedFeedPage />,
          },
          {
            path: `${ROUTES.SHARED_VALUES_PAGE}/:conversationId`,
            element: <SharedValuesPage />,
          },
          {
            path: ROUTES.PROFILE_PAGE,
            element: <ProfilePage />,
          },
          {
            path: `${ROUTES.BADGE_PAGE}`,
            element: <BadgePage />,
          },
        ],
      },

      // User B pages
      {
        path: `${ROUTES.USERB_LANDING_PAGE}/:conversationId`,
        element: <UserBLandingPage />,
      },
      {
        path: `${ROUTES.USERB_LOGIN_PAGE}/:conversationId`,
        element: <UserBLoginPage />,
      },
      {
        path: `${ROUTES.USERB_HOW_CM_WORKS_PAGE}/:conversationId`,
        element: <UserBHowCmWorksPage />,
      },
      {
        path: `${ROUTES.QUIZ_PAGE}/:conversationId`,
        element: <QuizPageUserB />,
      },
      {
        path: `${ROUTES.USERB_CORE_VALUES_PAGE}/:conversationId`,
        element: <UserBCoreValuesPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_VALUES_PAGE}/:conversationId`,
        element: <UserBSharedValuesPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_IMPACTS_PAGE}/:conversationId`,
        element: <UserBSharedImpactsPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SOLUTIONS_PAGE}/:conversationId`,
        element: <UserBSharedSolutionsPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUMMARY_PAGE}/:conversationId`,
        element: <UserBSharedSummaryPage />,
      },
      {
        path: `${ROUTES.USERB_SHARED_SUCCESS_PAGE}/:conversationId`,
        element: <UserBSharedSuccessPage />,
      },
      {
        path: `${ROUTES.USERB_SIGN_UP_PAGE}/:conversationId`,
        element: <UserBSignUpPage />,
      },
      {
        path: `${ROUTES.USERB_NO_CONSENT_PAGE}/:conversationId`,
        element: <UserBNoConsentPage />,
      },
    ],
  },
]);


export default router;
