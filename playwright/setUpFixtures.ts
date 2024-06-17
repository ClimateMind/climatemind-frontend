// setupFixtures.ts
import { test as base, expect } from './base'; // Import base fixtures
import { Quiz } from './pages/QuizPage';
import { Landing } from './pages/LandingPage';

type MyExtendedFixtures = {
  landingSetup: Landing;
  quizSetup: Quiz;
};

export const test = base.extend<MyExtendedFixtures>({
  landingSetup: async ({ landing }, use) => {
    await landing.navigate();
    await landing.acceptCookies();
    await landing.getStarted();
    await use(landing);
  },
  quizSetup: async ({ quiz }, use) => {
    await quiz.startTheQuiz();
    // await quiz.loadThePage();
    await quiz.getRadioButtons();
    await quiz.iterateQuestions();
    await use(quiz);
  },
});

export { expect } from '@playwright/test';
