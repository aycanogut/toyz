import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /send|gönder/i });
    await submitButton.click();

    await expect(page.locator('form')).toContainText(/at least|invalid/i);
  });

  test('should fill the form and attempt submission', async ({ page }) => {
    const contactForm = page.locator('form');
    await contactForm.locator('input[name="name"]').fill('Test Kullanıcısı');
    await contactForm.locator('input[name="email"]').fill('test@example.com');
    await contactForm.locator('input[name="subject"]').fill('E2E Test Konusu');
    await contactForm.locator('textarea[name="message"]').fill('Bu bir otomatik E2E test mesajıdır.');
    await contactForm.getByRole('button', { name: /send|gönder/i }).click();

    const toast = page.locator('[data-sonner-toast]');
    await expect(toast).toBeVisible({ timeout: 10000 });
  });
});
