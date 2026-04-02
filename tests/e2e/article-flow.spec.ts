import { expect, test } from '@playwright/test';

test.describe('Article Navigation Flow', () => {
  test('should navigate from home to article detail and verify content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });

    const detailLink = firstArticle.locator('a[href*="/content/"]');
    await expect(detailLink).toBeVisible({ timeout: 5000 });

    await Promise.all([
      page.waitForURL(/.*\/content\/.*/, { waitUntil: 'domcontentloaded', timeout: 15000 }),
      detailLink.click(),
    ]);

    const detailTitle = page.locator('h1');
    await expect(detailTitle).toBeVisible();

    const backButton = page.getByRole('button', { name: /back|geri/i });

    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/en$|\/tr$|\/$/, { timeout: 10000 });
    }
  });
});
