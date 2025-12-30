import { expect, test } from '@playwright/test';

test.describe('Language switcher', () => {
  test('should change language from EN to TR', async ({ page }) => {
    await page.goto('/en');

    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(() => window.scrollTo(0, 400));

    const desktopHeader = page.locator('div.hidden.lg\\:block header');

    const langButton = desktopHeader.getByRole('button', { name: 'en' });
    await expect(langButton).toBeVisible({ timeout: 10000 });

    await langButton.click();

    const turkishOption = page.locator('[role="dialog"]').getByRole('button', { name: 'TR', exact: true });
    await expect(turkishOption).toBeVisible();

    await Promise.all([page.waitForURL(/\/tr(\/|$)/, { timeout: 10000 }), turkishOption.click()]);

    await expect(page).toHaveURL(/\/tr(\/|$)/);
    await expect(page.locator('header').first()).toContainText(/anasayfa|hakkımızda|iletişim/i);
  });
});
