import { test, expect } from '@playwright/test';

test('Login with invalid password', async ({ page }) => {

  // Step 1: Open login page
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Enter valid username
  await page.locator('[data-test="username"]').fill('standard_user');

  // Step 3: Enter invalid password
  await page.locator('[data-test="password"]').fill('wrong_password');

  // Step 4: Click Login button
  await page.locator('[data-test="login-button"]').click();

  // Step 5: Verify the error message is shown
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );

  // Step 6: Expect the URL to be the same as the login page
  await expect(page).toHaveURL('https://www.saucedemo.com/');

});
