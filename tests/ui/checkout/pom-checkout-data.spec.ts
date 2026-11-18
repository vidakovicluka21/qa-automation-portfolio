import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';
import { CartPage } from '../../../pages/CartPage';
import { CheckoutPage } from '../../../pages/CheckoutPage';

const users = [
  { firstName: 'John', lastName: 'Doe', postalCode: '12345' },
  { firstName: 'Jane', lastName: 'Smith', postalCode: '67890' },
  { firstName: 'Jim', lastName: 'Beam', postalCode: '11111' },
];

for (const user of users) {
  test(`Checkout with POM data — ${user.firstName} ${user.lastName}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/);

    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.fillForm(user.firstName, user.lastName, user.postalCode);
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });
}
