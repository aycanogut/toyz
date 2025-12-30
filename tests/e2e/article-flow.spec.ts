import { expect, test } from '@playwright/test';

test.describe('Article Navigation Flow', () => {
  test('should navigate from home to article detail and verify content', async ({ page }) => {
    // 1. Ana sayfaya git ve sayfanın tamamen hazır (hydrated) olmasını bekle
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });

    const detailLink = firstArticle.getByRole('link', { name: /show more|içeriğe git/i });

    // 2. Linkin sadece görünür değil, aynı zamanda aktif olduğundan emin ol
    await expect(detailLink).toBeEnabled();

    // 3. Tıkla ve URL değişimini bekle
    await detailLink.click();

    // timeout süresini biraz esnetmek yavaş dev sunucuları için faydalıdır
    await expect(page).toHaveURL(/.*\/content\/.*/, { timeout: 15000 });

    const detailTitle = page.locator('h1');
    await expect(detailTitle).toBeVisible();

    const backButton = page.getByRole('button', { name: /back|geri/i });

    if (await backButton.isVisible()) {
      await backButton.click();
      // Ana sayfaya (veya dil öneki olan ana sayfaya) dönüldüğünü doğrula
      await expect(page).toHaveURL(/\/en$|\/tr$|\/$/);
    }
  });
});
