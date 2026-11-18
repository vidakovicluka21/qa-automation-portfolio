import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';

test('User can add backpack to cart using page object model', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
    await inventoryPage.addBackpackToCart();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
});