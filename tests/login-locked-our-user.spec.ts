import { test, expect } from '@playwright/test';

test('Login with locked out user', async ({ page }) => {

  // Step 1: Open login page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Enter username
  await page.locator('[data-test="username"]').fill('locked_out_user');

  // Step 3: Enter password
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // Step 4: Click Login button
  await page.locator('[data-test="login-button"]').click();

  // Step 5: Verify the error message is shown
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );

  // Step 6: Expect the URL to be the same as the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});