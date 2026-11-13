    import { test, expect } from '@playwright/test';

    test('User can successfully complete checkout', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');  

    // Step 1: Login  
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    // Step 2: Add product to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    // Step 3: Open shopping cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    // Step 4: Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    // Step 5: Fill in checkout form
        await page.getByPlaceholder('First Name').fill('John');
        await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('ZIP/Postal Code').fill('10000');

    // Step 6: Continue to checkout and verify checkout page is displayed
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    // Step 7: Complete checkout
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/checkout-complete.html/);

    // Step 8: Verify order confirmation page is displayed
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
    });