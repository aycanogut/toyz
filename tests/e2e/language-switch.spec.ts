import { expect, test } from '@playwright/test';

import tr from '../../locales/tr.json';

test.describe('Language switcher', () => {
  test('should change language from EN to TR', async ({ page }) => {
    await page.goto('/en');
    // Desktop header on homepage starts hidden (y: -100%) and animates in after 250px scroll
    await page.evaluate(() => window.scrollTo(0, 500));

    const header = page.locator('header:visible');
    await header.getByRole('button', { name: 'en', exact: true }).click();
    await page.getByRole('button', { name: 'TR', exact: true }).click();

    await expect(page).toHaveURL(/\/tr(\/|$)/);
    await expect(page.locator('header:visible')).toContainText(tr.Navigation.about, { ignoreCase: true });
  });
});
