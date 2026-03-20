import { expect, test } from '@playwright/test';

test.describe('Search', () => {
  test('should filter articles by category', async ({ page }) => {
    await page.goto('/search');

    const categoryButton = page.getByTestId('category-filter-trigger');

    await expect(categoryButton).toBeVisible();
    await categoryButton.click();

    const categoryOption = page.getByTestId('category-filter-option-skate');
    await expect(categoryOption).toBeVisible();
    await categoryOption.click();

    await expect(page).toHaveURL(/category=skate/);

    const firstArticle = page.locator('article').first();
    await expect(firstArticle).toBeVisible({ timeout: 10000 });
    await expect(firstArticle).toContainText(/skate/i);

    await categoryButton.click();

    const allOption = page.getByTestId('category-filter-option-all');
    await allOption.click();

    await expect(page).not.toHaveURL(/category=/);
  });
});
