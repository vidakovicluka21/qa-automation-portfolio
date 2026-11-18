import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import { CartPage } from '../../../pages/CartPage';

test('User can remove backpack from cart using page object model', async ({ page }) => {
    const loginPage = new LoginPage(page);// Initialize login page
    const inventoryPage = new InventoryPage(page); // Initialize inventory page
    const cartPage = new CartPage(page); // Initialize cart page
    await loginPage.goto(); // Go to login page
    await loginPage.login('standard_user', 'secret_sauce'); // Login
    await expect(page).toHaveURL(/inventory.html/); // Verify login
    await inventoryPage.addBackpackToCart(); // Add backpack to cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1'); // Verify cart badge
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible(); // Verify backpack is in cart
    await inventoryPage.openCart(); // Open cart
    await expect(page).toHaveURL(/cart.html/); // Verify cart page
    await cartPage.removeBackpackFromCart(); // Remove backpack from cart
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0); // Verify cart badge
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toHaveCount(0); // Verify backpack is removed

});