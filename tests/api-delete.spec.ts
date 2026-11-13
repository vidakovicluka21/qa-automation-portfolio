import { test, expect } from '@playwright/test';

test('DELETE request removes a post', async ({ request }) => {

  const response = await request.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toEqual({});

});

test('DELETE request removes dynamic postId', async ({ request }) => {

  const postId = 5;

  const response = await request.delete(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toEqual({});

});