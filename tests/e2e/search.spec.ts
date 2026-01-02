import { expect, test } from '@playwright/test';

test.describe('Search', () => {
  test('should filter articles by category', async ({ page }) => {
    await page.goto('/search');

    const categoryButton = page.locator('section.container button[aria-haspopup="dialog"]');

    await expect(categoryButton).toBeVisible();
    await categoryButton.click();

    const categoryOption = page.getByRole('button', { name: 'SKATE', exact: false });
    await expect(categoryOption).toBeVisible();
    await categoryOption.click();

    await expect(page).toHaveURL(/category=skate/);

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });
    await expect(firstArticle).toContainText(/skate/i);

    await categoryButton.click();

    const allOption = page.locator('div[role="dialog"] button').filter({ hasText: /all|kategori/i });
    await allOption.click();

    await expect(page).not.toHaveURL(/category=/);
  });
});
