import { test, expect } from '../base';
import { ElementHandle } from 'playwright'; // Import ElementHandle from playwright package

test.beforeEach(async ({ landing, quiz, page }) => {
  // try {
  // await page.goto('https://app.climatemind.org/');
  // console.log('Navigating to landing page');
  // await page.getByRole('button', { name: 'Accept' }).click();
  // await page.getByRole('button', { name: /get started/i }).click();
  // console.log('Navigating to landing page');
  await landing.navigate();
  console.log('Accepting cookies');
  await landing.acceptCookies();
  console.log('getting started');
  await landing.getStarted();
  console.log('starting the quiz');
  await quiz.startTheQuiz();
  //console.log('loading the page');
  // await quiz.loadThePage();
  console.log('getting radio buttons');
  await quiz.getRadioButtons();
  await quiz.iterateQuestions();
  // } catch (error) {
  //   console.error('Error during beforeEach setup:', error);
  //   throw error;
  // }
});

test('Should take me to the quiz questions', async ({ quiz }) => {
  await quiz.expectQuizQuestionnairePathToBeVisible();
  await quiz.expectQuizStartPathNotToBeVisible();
  await quiz.expectBonusQuestionVisible();
});
test.afterEach(async ({ page }) => {
  console.log('Resetting state');
  await page.context().clearCookies();
  await page.goto('/', { waitUntil: 'networkidle', timeout: 300000 });
});

// test('Bonus question should be available and submitted', async ({ quiz, page }) => {
//   await quiz.startTheQuiz();
//   await quiz.loadThePage();
//   await quiz.getRadioButtons();
//   await quiz.iterateQuestions();

//   //   await expect(page.getByText(/bonus/i)).toBeVisible();
// });
