// import and rename test to base
import { test as base } from '@playwright/test';
import { Landing } from './pages/LandingPage';
import { Quiz } from './pages/QuizPage';
// typescript type definition for fixtures
type MyFixtures = {
  landing: Landing;
  quiz: Quiz;
};
//export test and extend it with MyFixtures
export const test = base.extend<MyFixtures>({
  landing: async ({ page }, use) => {
    await use(new Landing(page));
  },
  quiz: async ({ page }, use) => {
    await use(new Quiz(page));
  },
});
//export expect
export { expect } from '@playwright/test';
