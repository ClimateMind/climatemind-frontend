// Configure constants for any routes here. When you need to refer to a routes import the routes constant into the file.
const ROUTES_CONFIG = {
  ROUTE_HOME: '/',
  ROUTE_PRIVACY: '/privacy',

  // existing userA
  ROUTE_LOGIN: '/login',
  PROFILE_MENU: '/profile-menu',
  ROUTE_VALUES: '/personal-values',
  ROUTE_FEED: '/climate-feed',
  ROUTE_SOLUTIONS: '/solutions',
  ROUTE_MYTHS: '/myths',
  ROUTE_CONVERSATIONS: '/conversations',
  ROUTE_SHARE_LINK: '/sharelink',
  USERA_SHARED_FEED: '/user-a-shared-feed',
  SHARED_VALUES: '/shared-values',
  ROUTE_PASSWORD_RESET: '/password-reset',

  // new userA
  ROUTE_PERSONALITY: '/start',
  ROUTE_QUIZ: '/questionnaire',
  ROUTE_SUBMIT: '/submit',
  ROUTE_SUBMIT_SET_TWO: '/submit-set-two',
  ROUTE_LOCATION: '/set-location',
  ROUTE_REGISTER: '/sign-up',

  // userB flow
  ROUTE_LANDING: '/landing/:conversationId',
  ROUTE_HOW_CM_WORKS: '/how-cm-works',
  USERB_NO_CONSENT: '/user-b/no-share',
  USERB_CORE_VALUES: '/core-values',
  USERB_SHARED_VALUES: '/shared-values-user-b',
  USERB_SHARED_IMPACTS: '/shared-impacts',
  USERB_SHARED_SOLUTIONS: '/shared-solutions',
  USERB_SHARED_SUMMARY: '/shared-summary',
  USERB_SHARED_SUCCESS: '/shared',
  USERB_ROUTE_REGISTER: '/sign-up-user-b',
};

export default ROUTES_CONFIG;
