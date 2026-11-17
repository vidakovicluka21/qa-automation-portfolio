import { test, expect } from '@playwright/test';

test.describe('Checkout validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart.html/);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  test('First name is required', async ({ page }) => {
    // Leave First Name empty
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('ZIP/Postal Code').fill('10000');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Error: First Name is required'
    );
  });

  test('Last name is required', async ({ page }) => {
    await page.getByPlaceholder('First Name').fill('John');
    // Leave Last Name empty
    await page.getByPlaceholder('ZIP/Postal Code').fill('10000');

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Error: Last Name is required'
    );
  });

  test('Postal code is required', async ({ page }) => {
    await page.getByPlaceholder('First Name').fill('John');
    await page.getByPlaceholder('Last Name').fill('Doe');
    // Leave Postal Code empty

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/checkout-step-one.html/);
    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Error: Postal Code is required'
    );
  });

});
