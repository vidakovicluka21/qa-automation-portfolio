import { test, expect } from '@playwright/test';

test('GET request returns user data', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/users/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.name).toBe('Leanne Graham');
  expect(body.email).toBe('Sincere@april.biz');

});

test('GET request returns post data', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.userId).toBe(1);
  expect(body.id).toBe(1);
  expect(body.title).not.toBeNull();
  expect(body.body).not.toBeNull();
});