import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import { CartPage } from '../../../pages/CartPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

test.describe('Checkout with POM', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);
  });

  test.afterEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.resetAppState();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('User can checkout using page object model', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addBackpackToCart();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillForm('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

});
