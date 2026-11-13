import { test, expect } from '@playwright/test';

test('User can add two items to cart', async ({ page }) => {

  // Step 1: Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Step 2: Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 3: Verify login
  await expect(page).toHaveURL(/inventory.html/);

  // Step 4: Add two items to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // Step 5: Verify cart badge
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  // Step 6: Open shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart.html/);

  // Step 7: Verify product in cart
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();

});
