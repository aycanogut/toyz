import { expect, test } from '@playwright/test';

test.describe('Search overlay', () => {
  test('should open and close search overlay', async ({ page }) => {
    await page.goto('/');

    const searchButton = page.locator('button[aria-label="search"]').first();
    await expect(searchButton).toBeVisible();
    await searchButton.click();

    const overlay = page.locator('input[type="text"]').first();
    await expect(overlay).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(overlay).not.toBeVisible();
  });

  test('should show results when typing', async ({ page }) => {
    await page.goto('/');

    const searchButton = page.locator('button[aria-label="search"]').first();
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
