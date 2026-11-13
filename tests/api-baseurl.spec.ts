import { test, expect } from '@playwright/test';

test('GET request returns post data using baseURL', async ({ request }) => {

  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(1);
  expect(responseBody.userId).toBe(1);
});

test('GET request returns user data using baseURL', async ({ request }) => {

  const response = await request.get('/users/2');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(2);
  expect(responseBody.name).toBe('Ervin Howell');
});