// ClimateMindPage.ts
import { Locator, Page, expect } from '@playwright/test';

export class Landing {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly getStartedBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByRole('button', { name: 'Accept' });
    this.getStartedBtn = page.getByRole('button', { name: /get started/i });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acceptCookies(): Promise<void> {
    await this.acceptCookiesBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getStarted(): Promise<void> {
    await this.getStartedBtn.click({ force: true });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectTitleToContain(substring: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(substring, 'i'));
  }

  async expectQuizTextVisible(substring: string): Promise<void> {
    await expect(this.page.getByText(substring)).toBeVisible();
  }
}
