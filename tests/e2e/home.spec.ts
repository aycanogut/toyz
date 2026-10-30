import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and display the article list', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveTitle(/TOYZ/i);

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible();
    await expect(firstArticle.locator('h2').first()).toBeVisible();
    await expect(firstArticle.locator('a[href*="/content/"]').first()).toBeVisible();
  });
});
