import { expect, test, type Page } from '@playwright/test';

import en from '../../locales/en.json';

function getContactFormLocator(page: Page) {
  return page.locator('form').filter({ has: page.locator('input[name="name"]') });
}

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/contact');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    const contactForm = getContactFormLocator(page);
    await contactForm.getByRole('button', { name: /send/i }).click();

    await expect(contactForm).toContainText(en.Contact['validation-name-error']);
    await expect(contactForm).toContainText(en.Contact['validation-email-error']);
    await expect(contactForm).toContainText(en.Contact['validation-subject-error']);
    await expect(contactForm).toContainText(en.Contact['validation-message-error']);
  });

  // reCAPTCHA is blocked so the form can never reach mailAction: the test must not send real mail.
  test('should not submit when no reCAPTCHA token is available', async ({ page }) => {
    await page.route('**/recaptcha/**', route => route.abort());
    await page.reload();

    const serverActionRequests: string[] = [];
    page.on('request', request => {
      if (request.headers()['next-action']) {
        serverActionRequests.push(request.url());
      }
    });

    const contactForm = getContactFormLocator(page);
    await contactForm.locator('input[name="name"]').fill('Test User');
    await contactForm.locator('input[name="email"]').fill('test@example.com');
    await contactForm.locator('input[name="subject"]').fill('E2E Test Subject');
    await contactForm.locator('textarea[name="message"]').fill('This is an automated E2E test message.');
    await contactForm.getByRole('button', { name: /send/i }).click();

    await expect(page.locator('[data-sonner-toast]')).toContainText(en.Contact.error);
    expect(serverActionRequests).toEqual([]);
  });
});
