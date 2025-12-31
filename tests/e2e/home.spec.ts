import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and display main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/TOYZ/i);

    const slider = page.locator('section').first();
    await expect(slider).toBeVisible();

    const contentSection = page.locator('section').filter({ hasText: /./ });
    await expect(contentSection).toBeVisible();

    const articles = page.locator('article');
    await expect(articles.first()).toBeVisible({ timeout: 10000 });

    const firstArticleTitle = articles.first().locator('h2');
    await expect(firstArticleTitle).toBeVisible();

    const firstArticleLink = articles.first().locator('a[href*="/content/"]');
    await expect(firstArticleLink).toBeVisible();
  });
});
