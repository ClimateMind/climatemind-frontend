// import and rename test to base
import { test as base } from '@playwright/test';
import { Landing } from './pages/LandingPage';
// typescript type definition for fixtures
type MyFixtures = {
  landing: Landing;
};
//export test and extend it with MyFixtures
export const test = base.extend<MyFixtures>({
  landing: async ({ page }, use) => {
    await use(new Landing(page));
  },
});
//export expect
export { expect } from '@playwright/test';
