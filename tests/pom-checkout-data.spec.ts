import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const users = [
    {firstName: 'John', lastName: 'Doe', postalCode: '12345'},
    {firstName: 'Jane', lastName: 'Smith', postalCode: '67890'},
    {firstName: 'Jim', lastName: 'Beam', postalCode: '11111'},

]

for (const user of users) {
    test(`User can checkout using page object model with data ${user.firstName} ${user.lastName}`, async ({ page }) => {
        const loginPage = new LoginPage(page); // Initialize login page
        const inventoryPage = new InventoryPage(page); // Initialize inventory page
        const cartPage = new CartPage(page); // Initialize cart page
        const checkoutPage = new CheckoutPage(page); // Initialize checkout page
        await loginPage.goto(); // Go to login page
        await loginPage.login('standard_user', 'secret_sauce'); // Login
        await expect(page).toHaveURL(/inventory.html/); // Verify login
        await inventoryPage.addBackpackToCart(); // Add backpack to cart
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1'); // Verify cart badge
        await inventoryPage.openCart(); // Open cart
        await expect(page).toHaveURL(/cart.html/); // Verify cart page
        await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible(); // Verify backpack is in cart
        await cartPage.checkout(); // Checkout
        await expect(page).toHaveURL(/checkout-step-one.html/); // Verify checkout page
        await checkoutPage.fillForm(user.firstName, user.lastName, user.postalCode); // Fill form
        await checkoutPage.continueCheckout(); // Continue checkout
        await expect(page).toHaveURL(/checkout-step-two.html/); // Verify checkout page
        await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible(); // Verify backpack is in checkout page
        await checkoutPage.finishCheckout(); // Finish checkout
        await expect(page).toHaveURL(/checkout-complete.html/); // Verify checkout complete page
        await expect(page.getByText('Thank you for your order!')).toBeVisible(); // Verify thank you message
    });
}