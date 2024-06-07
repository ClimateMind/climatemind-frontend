import { test, expect } from '../base';
import { ElementHandle } from 'playwright'; // Import ElementHandle from playwright package

test.beforeEach(async ({ landing }) => {
  await landing.navigate();
  await landing.acceptCookies();
  await landing.getStarted();
});

test('Should take me to the quiz questions', async ({ quiz, page }) => {
  await quiz.startTheQuiz();
  await quiz.loadThePage();
  await quiz.getRadioButtons();
  await quiz.iterateQuestions();
  await quiz.expectQuizQuestionnairePathToBeVisible();
  await quiz.expectQuizStartPathNotToBeVisible();
  await quiz.expectBonusQuestionVisible();
});

// test('Bonus question should be available and submitted', async ({ quiz, page }) => {
//   await quiz.startTheQuiz();
//   await quiz.loadThePage();
//   await quiz.getRadioButtons();
//   await quiz.iterateQuestions();

//   //   await expect(page.getByText(/bonus/i)).toBeVisible();
// });
