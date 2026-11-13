import { test, expect } from '@playwright/test';

test.describe('Checkout validation', () => {

  test('First name is required', async ({ page }) => {
    // Test for empty first name  
    // Open SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory.html/);

  // Add product to cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  // Open shopping cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  // Checkout
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one.html/);
  // Fill in checkout form with empty name
  await page.getByPlaceholder('First Name').fill('');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('ZIP/Postal Code').fill('10000');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/checkout-step-one.html/);

  // verify error message is displayed
  await expect(page.getByText('Error: First Name is required', { exact: true })).toBeVisible();
  });

  test('Last name is required', async ({ page }) => {
    // Test for empty last name
 // Open SauceDemo
 await page.goto('https://www.saucedemo.com/');

 // Login
 await page.getByPlaceholder('Username').fill('standard_user');
 await page.getByPlaceholder('Password').fill('secret_sauce');
 await page.getByRole('button', { name: 'Login' }).click();
 await expect(page).toHaveURL(/inventory.html/);

 // Add product to cart
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

 // Open shopping cart
 await page.locator('[data-test="shopping-cart-link"]').click();
 await expect(page).toHaveURL(/cart.html/);
 await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

 // Checkout
 await page.locator('[data-test="checkout"]').click();
 await expect(page).toHaveURL(/checkout-step-one.html/);
 // Fill in checkout form with empty name
 await page.getByPlaceholder('First Name').fill('John');
 await page.getByPlaceholder('Last Name').fill('');
 await page.getByPlaceholder('ZIP/Postal Code').fill('10000');
 await page.getByRole('button', { name: 'Continue' }).click();
 await expect(page).toHaveURL(/checkout-step-one.html/);

 // verify error message is displayed
 await expect(page.getByText('Error: Last Name is required', { exact: true })).toBeVisible();
  });

  test('Postal code is required', async ({ page }) => {
    // Test for empty postal code
 // Open SauceDemo
 await page.goto('https://www.saucedemo.com/');

 // Login
 await page.getByPlaceholder('Username').fill('standard_user');
 await page.getByPlaceholder('Password').fill('secret_sauce');
 await page.getByRole('button', { name: 'Login' }).click();
 await expect(page).toHaveURL(/inventory.html/);

 // Add product to cart
 await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

 // Open shopping cart
 await page.locator('[data-test="shopping-cart-link"]').click();
 await expect(page).toHaveURL(/cart.html/);
 await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

 // Checkout
 await page.locator('[data-test="checkout"]').click();
 await expect(page).toHaveURL(/checkout-step-one.html/);
 // Fill in checkout form with empty name
 await page.getByPlaceholder('First Name').fill('John');
 await page.getByPlaceholder('Last Name').fill('Doe');
 await page.getByPlaceholder('ZIP/Postal Code').fill('');
 await page.getByRole('button', { name: 'Continue' }).click();
 await expect(page).toHaveURL(/checkout-step-one.html/);

 // verify error message is displayed
 await expect(page.getByText('Error: Postal Code is required', { exact: true })).toBeVisible();
  });

});