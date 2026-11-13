import { test, expect } from '@playwright/test';

test('GET request returns 404 for nonexistent post', async ({ request }) => {

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/999999'
  );

  expect(response.status()).toBe(404);

});

test('GET request returns 404 and empty JSON for nonexistent user', async ({ request }) => {

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users/999999'
    );
    const responseBody = await response.json();
  
    expect(response.status()).toBe(404);
    expect(responseBody).toEqual({});
  
  });