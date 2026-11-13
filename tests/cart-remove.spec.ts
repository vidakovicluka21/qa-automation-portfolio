import { test, expect } from '@playwright/test';

test('User can add backpack to cart then remove it', async ({ page }) => {

  // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);

  // Add backpack
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Verify cart badge shows 1
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('1');

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Verify cart page
  await expect(page).toHaveURL(/cart.html/);

  // Verify backpack exists
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  // Remove backpack
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  // Verify backpack is removed
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toHaveCount(0);

  // Verify cart badge is gone
  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveCount(0);

});
