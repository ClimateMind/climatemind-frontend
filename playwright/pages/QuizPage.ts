import { Locator, Page, Expect, ElementHandle } from '@playwright/test';
import { expect } from '@playwright/test';

export class Quiz {
  readonly page: Page;
  readonly takeTheQuizBtn: Locator;
  readonly getFullUrl: string;
  readonly loadPage: Promise<void>;
  readonly getAllRadioButtons: any;
  //   readonly waitForEachQuestion: Promise<void>;

  constructor(page: Page, number: number) {
    this.page = page;
    this.takeTheQuizBtn = page.getByRole('button', { name: /take the quiz/i });
    this.getFullUrl = page.url();
    this.loadPage = page.waitForLoadState('domcontentloaded');
    this.getAllRadioButtons = page.$$('input[type="radio"]');
  }

  async startTheQuiz(): Promise<void> {
    await this.takeTheQuizBtn.click();
  }

  async loadThePage(): Promise<void> {
    await this.loadPage;
  }

  async getRadioButtons(): Promise<ElementHandle<SVGElement | HTMLElement>[]> {
    const buttons = await this.page.$$('input[type="radio"]');
    return buttons;
  }

  async waitForEachQuestion(duration: number): Promise<void> {
    await this.page.waitForTimeout(duration);
  }

  async iterateQuestions(): Promise<void> {
    const radioButtons = await this.getRadioButtons();
    const numberOfButtons = radioButtons.length;

    if (numberOfButtons === 0) {
      throw new Error('No radio buttons found on the page.');
    }

    // Iterate through first 10 radio buttons and click on them
    for (let i = 0; i < 10; i++) {
      // Generate a random index for each iteration
      const randomIndex = Math.floor(Math.random() * numberOfButtons);

      // Click on the randomly selected radio button
      await radioButtons[randomIndex].click();

      // Wait for a small timeout to let any potential animation finish
      //   await this.page.waitForTimeout(1000);
      await this.waitForEachQuestion(1000);
    }
  }

  async expectQuizTextVisible(): Promise<void> {
    const fullUrl = await this.page.url();
    const url = new URL(fullUrl);
    expect(url.pathname).toBe('/questionnaire');
  }
}
