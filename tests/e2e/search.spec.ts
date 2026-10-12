import { expect, test, type Page } from '@playwright/test';

import en from '../../locales/en.json';

async function openSearch(page: Page) {
  await page.goto('/en');
  // Desktop header on homepage starts hidden (y: -100%) and animates in after 250px scroll
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.getByRole('button', { name: en.Navigation.search }).click();

  const dialog = page.getByRole('dialog', { name: en.Search.title });
  await expect(dialog).toBeVisible();

  return dialog;
}

test.describe('Search overlay', () => {
  test('should close with Escape', async ({ page }) => {
    const dialog = await openSearch(page);

    await expect(dialog.getByRole('textbox', { name: en.Search.placeholder })).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('should show results or the empty state when typing', async ({ page }) => {
    const dialog = await openSearch(page);

    await dialog.getByRole('textbox', { name: en.Search.placeholder }).fill('punk');

    const resultOrEmptyState = dialog.locator('a[href*="/content/"]').or(dialog.getByText(en.Search.result)).first();
    await expect(resultOrEmptyState).toBeVisible();
  });

  test('should close with the close button', async ({ page }) => {
    const dialog = await openSearch(page);

    await dialog.getByRole('button', { name: 'Close search' }).click();
    await expect(dialog).toBeHidden();
  });
});
