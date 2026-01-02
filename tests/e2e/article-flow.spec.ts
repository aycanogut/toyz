import { expect, test } from '@playwright/test';

test.describe('Article Navigation Flow', () => {
  test('should navigate from home to article detail and verify content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });

    const detailLink = firstArticle.getByRole('link', { name: /show more|içeriğe git/i });

    await expect(detailLink).toBeEnabled();

    await detailLink.click();

    await expect(page).toHaveURL(/.*\/content\/.*/, { timeout: 15000 });

    const detailTitle = page.locator('h1');
    await expect(detailTitle).toBeVisible();

    const backButton = page.getByRole('button', { name: /back|geri/i });

    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/en$|\/tr$|\/$/);
    }
  });
});
