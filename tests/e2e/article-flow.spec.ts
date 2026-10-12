import { expect, test } from '@playwright/test';

test.describe('Article Navigation Flow', () => {
  test('should navigate from home to the matching article detail', async ({ page }) => {
    await page.goto('/en');

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible();

    const title = (await firstArticle.locator('h2').first().textContent())?.trim();
    const detailLink = firstArticle.locator('a[href*="/content/"]').first();
    const href = await detailLink.getAttribute('href');

    expect(title).toBeTruthy();
    expect(href).toBeTruthy();

    await detailLink.click();

    // The dev server compiles the detail page on first visit, which can take well over 5s.
    await expect(page).toHaveURL(new URL(href!, page.url()).href, { timeout: 30000 });
    await expect(page.locator('h1')).toHaveText(title!);
  });
});
