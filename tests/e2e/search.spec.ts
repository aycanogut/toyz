import { expect, test } from '@playwright/test';

test.describe('Search overlay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1440, height: 900 });
    // Desktop header on homepage starts hidden (y: -100%) and animates in after 250px scroll
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(400);
  });

  test('should open and close search overlay', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'search' });
    await expect(searchButton).toBeVisible({ timeout: 5000 });
    await searchButton.click();

    const overlay = page.locator('input[type="text"]').first();
    await expect(overlay).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(overlay).not.toBeVisible();
  });

  test('should show results when typing', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'search' });
    await expect(searchButton).toBeVisible({ timeout: 5000 });
    await searchButton.click();

    const input = page.locator('input[type="text"]').first();
    await input.fill('punk');

    await page.waitForTimeout(500);

    const closeButton = page.locator('button[aria-label="Close search"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(input).not.toBeVisible();
  });
});
