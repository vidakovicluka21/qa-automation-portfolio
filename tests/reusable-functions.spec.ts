import { test, expect, type Page } from '@playwright/test';

// Write your login function here

async function login(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
}

// Write your add backpack to cart function here

async function addBackpackToCart(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
}

//Open cart function

async function openCart(page: Page) {
  await page.locator('[data-test="shopping-cart-link"]').click();
}

test('User can add backpack to cart using reusable functions', async ({ page }) => {

  // Call login function
  await login(page);

  // Verify login
  await expect(page).toHaveURL(/inventory.html/);

  // Call add backpack to cart function
  await addBackpackToCart(page);

  // Verify cart badge
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  // Open shopping cart and verify backpack is in cart
  await openCart(page);
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

});