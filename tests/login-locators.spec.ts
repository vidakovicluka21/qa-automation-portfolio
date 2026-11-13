import { test, expect } from '@playwright/test';

test('Login using different locators', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  // Find username by placeholder
  await page.getByPlaceholder('Username').fill('standard_user');

  // Find password by CSS ID
  await page.locator('#password').fill('secret_sauce');

  // Find Login button by role
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL(/inventory.html/);

  // Verify Products heading is visible
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

});
