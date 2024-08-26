import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(' http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/DecoAR app/);
});

test('search input should redirect to Browse Page when clicked', async ({ page }) => {
  await page.goto(' http://localhost:3000');

// Clicks on the search input.
  await page.getByPlaceholder('Search for products...').click();

  // Expects page to have a heading with the name of Browse products.
  await expect(page.getByRole('heading', { name: 'Browse products' })).toBeVisible();
});
