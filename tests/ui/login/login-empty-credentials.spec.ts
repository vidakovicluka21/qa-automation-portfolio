import { test, expect } from '@playwright/test';

test('Login with empty credentials', async ({ page }) => {

  // Step 1: Open login page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Click Login button
  await page.locator('[data-test="login-button"]').click();

  // Step 3: Verify the error message is shown
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toHaveText(
    'Epic sadface: Username is required'
  );

  // Step 4: Expect the URL to be the same as the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');

});
