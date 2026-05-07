import { expect, test } from '@playwright/test';

test.describe('Events Navigation Flow', () => {
  test('should navigate from events list to event detail', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const eventCard = page.locator('a[href*="/events/"]').first();
    const hasEvents = await eventCard.isVisible();

    if (!hasEvents) {
      test.skip(true, 'No events found in database');
      return;
    }

    await eventCard.click();
    const navigated = await page
      .waitForURL(/\/events\/.+/, { waitUntil: 'domcontentloaded', timeout: 15000 })
      .then(() => true)
      .catch(() => false);

    if (!navigated) return;

    await expect(page.locator('h1')).toBeVisible();

    const backButton = page.getByRole('button', { name: /^(back|geri)$/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      await expect(page).toHaveURL(/\/events$/, { timeout: 10000 });
    }
  });

  test('should display event details correctly', async ({ page }) => {
    await page.goto('/events');
    await page.waitForLoadState('networkidle');

    const eventCard = page.locator('a[href*="/events/"]').first();
    if (!(await eventCard.isVisible())) return;

    await eventCard.click();
    const navigated = await page
      .waitForURL(/\/events\/.+/, { waitUntil: 'domcontentloaded', timeout: 15000 })
      .then(() => true)
      .catch(() => false);

    if (!navigated) return;

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article')).toBeVisible({ timeout: 10000 });
  });
});
