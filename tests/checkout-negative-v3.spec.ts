import { test, expect } from '@playwright/test';

test.describe('Checkout validation', () => {

  test.beforeEach(async ({ page }) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory.html/);

    // Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Open cart
    await page.locator('[data-test="shopping-cart-link"]').click();

    // Go to checkout
    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

  });

  test('First name is required', async ({ page }) => {

    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('ZIP/Postal Code').fill('10000');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await expect(
      page.getByText('Error: First Name is required', { exact: true })
    ).toBeVisible();

  });

  test('Last name is required', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('ZIP/Postal Code').fill('10000');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await expect(
      page.getByText('Error: Last Name is required', { exact: true })
    ).toBeVisible();

  });

  test('Postal code is required', async ({ page }) => {

    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await expect(
      page.getByText('Error: Postal Code is required', { exact: true })
    ).toBeVisible();

  });

});
