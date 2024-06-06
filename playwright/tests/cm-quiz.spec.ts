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
  //   await quiz.waitforNextPageToLoad();
  //   await quiz.expectQuizTextVisible();
  //   const fullUrl = await page.url();
  //   console.log(fullUrl);
  //   const url = new URL(fullUrl);
  //   await page.waitForLoadState('domcontentloaded'); // Wait for DOM content to be loaded
  //   const radioButtons = await page.$$('input[type="radio"]');
  //   const numberOfButtons = radioButtons.length;

  //   if (numberOfButtons === 0) {
  //     throw new Error('No radio buttons found on the page.');
  //   }

  //   //   iterate through first 10 radio buttons and click on them
  //   // Loop through 10 times to select a random radio button
  //   for (let i = 0; i < 10; i++) {
  //     // Generate a random index for each iteration
  //     const randomIndex = Math.floor(Math.random() * numberOfButtons);

  //     // Click on the randomly selected radio button
  //     await radioButtons[randomIndex].click();

  //     // Wait for a small timeout to let any potential animation finish
  //     await page.waitForTimeout(1000);
  //   }

  //   await page.waitForTimeout(1000);
  //   const textInput = await page.$('input[type="text"]');
  //   await (textInput as ElementHandle<HTMLInputElement>).fill('Some custom feedback'); // Call fill method on textInput element
  //   console.log(textInput);
  //   await expect(url.pathname).toBe('/questionnaire');
  //   await expect(url.pathname).toBe('/questionnaire');
  //   await expect(url.pathname).not.toBe('/start');
  //   await expect(page.getByText(/bonus/i)).toBeVisible();
});
