import { expect, test } from '@playwright/test';

test.describe('Events Navigation Flow', () => {
  test('should navigate from events list to event detail', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('domcontentloaded');

    const eventCard = page.locator('a[href*="/events/"]').first();
    await expect(eventCard).toBeVisible({ timeout: 10000 });

    await Promise.all([
      page.waitForURL(
        url => url.pathname.includes('/events/') && url.pathname.split('/').filter(Boolean).length >= 3,
        { waitUntil: 'domcontentloaded', timeout: 15000 }
      ),
      eventCard.click(),
    ]);

    const eventTitle = page.locator('h1');
    await expect(eventTitle).toBeVisible();

    const backButton = page.getByRole('button', { name: /back|geri/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/events$/, { timeout: 10000 });
    }
  });

  test('should display event details correctly', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('domcontentloaded');

    const eventCard = page.locator('a[href*="/events/"]').first();
    if (await eventCard.isVisible()) {
      await Promise.all([
        page.waitForURL(url => url.pathname.includes('/events/') && url.pathname.split('/').filter(Boolean).length >= 3, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        }),
        eventCard.click(),
      ]);

      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('article')).toBeVisible({ timeout: 10000 });
    }
  });
});
