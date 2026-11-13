import { test, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

test('GET - should return 404 for non-existing post', async ({ request }) => {
  const postsApi = new PostsApi(request);

  const response = await postsApi.getPost(999999);

  expect(response.status()).toBe(404);

  const responseBody = await response.json();

  expect(responseBody).toEqual({});
});

test('POST - investigate invalid request data', async ({ request }) => {
  const response = await request.post('/posts', {
    data: {
      title: 12345,
      body: null,
      userId: 'invalid-user'
    }
  });

  console.log('HTTP Status:', response.status());

  const responseBody = await response.json();

  console.log('Response Body:', responseBody);

  expect(response.status()).toBe(201);
});

test('Invalid HTTP method - investigate API response', async ({ request }) => {
  const response = await request.patch('/invalid-endpoint', {
    data: {
      title: 'Test'
    }
  });

  console.log('HTTP Status:', response.status());
  console.log('Response:', await response.text());

  expect(response.status()).toBe(404);
});

