import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 375,
    viewportHeight: 812,
    chromeWebSecurity: false, // This allows cross-origin requests
  },
  env: {
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
});
