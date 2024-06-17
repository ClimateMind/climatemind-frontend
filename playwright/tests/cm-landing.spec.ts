import { test } from '../base';

test.beforeEach(async ({ landing }) => {
  await landing.navigate();
  await landing.acceptCookies();
});

test('landing page should accept cookies and show title', async ({ landing }) => {
  await landing.expectTitleToContain('Climate Mind');
});

test('Get Started button should navigated to started page', async ({ landing }) => {
  await landing.getStarted();
  await landing.expectQuizTextVisible('Take this short quiz about personal values so we can help you find common ground and topics for your conversations.');
  await landing.expectTitleToContain('Climate Mind');
});

test.afterEach(async ({ landing, page }) => {
  await landing.navigate(); // Ensure you navigate back to home or reset state
});
