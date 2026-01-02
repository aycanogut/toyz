import { expect, test } from '@playwright/test';

test.describe('Events Navigation Flow', () => {
  test('should navigate from events list to event detail', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const eventCard = page.locator('main').locator('a[href*="/events/"]').first();
    await expect(eventCard).toBeVisible({ timeout: 10000 });

    await eventCard.click();

    await page.waitForURL(url => url.pathname.includes('/events/') && url.pathname.split('/').filter(Boolean).length >= 3);

    const eventTitle = page.locator('h1');
    await expect(eventTitle).toBeVisible();

    const backButton = page.getByRole('button', { name: /back|geri/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/events$/);
    }
  });

  test('should display event details correctly', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const eventCard = page.locator('main').locator('a[href*="/events/"]').first();
    if (await eventCard.isVisible()) {
      await eventCard.click();

      await page.waitForLoadState('domcontentloaded');

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('article')).toBeVisible({ timeout: 10000 });
    }
  });
});
