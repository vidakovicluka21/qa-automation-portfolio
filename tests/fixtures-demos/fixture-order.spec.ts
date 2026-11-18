import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  customer: {
    id: number;
    name: string;
    email: string;
  };
  order: {
    orderId: number;
    customerId: number;
    total: number;
  };
};

const test = base.extend<MyFixtures>({
  customer: async ({}, use) => {
    console.log('SETUP: Creating customer');

    const customer = {
      id: 101,
      name: 'Luka',
      email: 'luka@test.com'
    };

    await use(customer);

    console.log('TEARDOWN: Customer finished');
  },

  order: async ({ customer }, use) => {
    console.log('SETUP: Creating order');

    const order = {
      orderId: 5001,
      customerId: customer.id,
      total: 199.99
    };

    await use(order);

    console.log('TEARDOWN: Order finished');
  }
});

test('Fixture dependencies - order uses customer', async ({ order }) => {
  console.log('Running test');

  expect(order.orderId).toBe(5001);
  expect(order.customerId).toBe(101);
  expect(order.total).toBe(199.99);
});
