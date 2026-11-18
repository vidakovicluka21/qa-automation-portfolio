import { test, expect } from '@playwright/test';

test('GET post matches expected structure', async ({ request }) => {

  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody).toMatchObject({
    id: 1,
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number)
  });

});

// TODO: Write second test for GET /users/1

test('GET user matches expected structure', async ({ request }) => {

  const response = await request.get('/users/1');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  
  expect(responseBody).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    username: expect.any(String),
    email: expect.any(String)
  });

});
