import { Locator, Page, ElementHandle } from '@playwright/test';
import { expect } from '@playwright/test';

export class Quiz {
  readonly page: Page;
  readonly takeTheQuizBtn: Locator;
  readonly getFullUrl: string;
  readonly loadPage: Promise<void>;
  readonly getAllRadioButtons: any;
  //   readonly waitForEachQuestion: Promise<void>;

  constructor(page: Page) {
    this.page = page;
    this.takeTheQuizBtn = page.getByRole('button', { name: /take the quiz/i });
    this.getFullUrl = page.url();
    this.loadPage = page.waitForLoadState('domcontentloaded');
    this.getAllRadioButtons = page.$$('input[type="radio"]');
  }

  async startTheQuiz(): Promise<void> {
    await this.takeTheQuizBtn.click({ timeout: 30000 });
    await this.page.waitForURL('/questionnaire');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // async loadThePage(): Promise<void> {
  //   await this.page.waitForLoadState('domcontentloaded');
  //   await this.loadPage;
  // }

  async getRadioButtons(): Promise<ElementHandle<SVGElement | HTMLElement>[]> {
    await this.page.waitForSelector('input[type="radio"]');
    const buttons = await this.page.$$('input[type="radio"]');
    return buttons;
  }

  async waitForEachQuestion(duration: number): Promise<void> {
    await this.page.waitForTimeout(duration);
  }

  async iterateQuestions(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    const radioButtons = await this.getRadioButtons();
    const numberOfButtons = radioButtons.length;

    if (numberOfButtons === 0) {
      throw new Error('No radio buttons found on the page.');
    }

    // Iterate through first 10 radio buttons and click on them
    for (let i = 0; i < 10; i++) {
      try {
        // Retrieve the radio buttons for the current question
        const radioButtons = await this.getRadioButtons();
        const numberOfButtons = radioButtons.length;

        if (numberOfButtons === 0) {
          throw new Error('No radio buttons found on the page.');
        }

        // Generate a random index for each iteration
        const randomIndex = Math.floor(Math.random() * numberOfButtons);

        // Click on the randomly selected radio button
        await radioButtons[randomIndex].click({ force: true, timeout: 1000 });

        // Wait for a small timeout to let any potential animation finish
        // await this.waitForEachQuestion(5000);

        // Wait for any potential animation to finish
        // await this.waitForEachQuestion(500);

        // Wait for the next set of radio buttons to appear

        await this.waitForEachQuestion(1000);
        // await this.page.waitForSelector('input[type="radio"]:not(:checked)');
      } catch (error) {
        console.error(`Error iterating questions at step ${i}:`, error);
        throw error; // If needed, decide whether to continue or stop on error
      }
    }
  }

  async expectQuizQuestionnairePathToBeVisible(): Promise<void> {
    const fullUrl = await this.page.url();
    const url = new URL(fullUrl);
    expect(url.pathname).toBe('/questionnaire');
  }
  async expectQuizStartPathNotToBeVisible(): Promise<void> {
    const fullUrl = await this.page.url();
    const url = new URL(fullUrl);
    expect(url.pathname).not.toBe('/start');
  }
  async expectBonusQuestionVisible(): Promise<void> {
    await expect(this.page.getByText(/bonus/i)).toBeVisible();
  }
}
