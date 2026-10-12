import { expect, test } from '@playwright/test';

test.describe('Events Navigation Flow', () => {
  test('should navigate from events list to event detail', async ({ page }) => {
    await page.goto('/en/events');
    await expect(page.locator('h1')).toBeVisible();

    const eventLinks = page.locator('a[href*="/events/"]');
    test.skip((await eventLinks.count()) === 0, 'No published events in the database');

    const firstEvent = eventLinks.first();
    const href = await firstEvent.getAttribute('href');
    expect(href).toBeTruthy();

    await firstEvent.click();

    // The dev server compiles the detail page on first visit, which can take well over 5s.
    await expect(page).toHaveURL(new URL(href!, page.url()).href, { timeout: 30000 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article').first()).toBeVisible();
  });
});
