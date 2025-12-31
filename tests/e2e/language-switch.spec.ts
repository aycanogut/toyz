import { expect, test } from '@playwright/test';

test.describe('Language switcher', () => {
  test('should change language from EN to TR', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    await page.setViewportSize({ width: 1440, height: 900 });

    await page.evaluate(() => window.scrollTo(0, 500));

    await page.waitForTimeout(1500);

    const langButton = page.locator('header').getByRole('button', { name: 'en', exact: false }).first();
    await expect(langButton).toBeVisible();

    await langButton.click({ force: true });

    const turkishOption = page.getByRole('button', { name: 'TR', exact: true });
    await expect(turkishOption).toBeVisible();

    await Promise.all([page.waitForURL(/\/tr(\/|$)/), turkishOption.click()]);

    await expect(page).toHaveURL(/\/tr(\/|$)/);

    await expect(page.locator('header').first()).toContainText(/anasayfa|hakkımızda|iletişim/i);
  });
});
