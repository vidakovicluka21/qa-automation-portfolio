import { test, expect } from '@playwright/test';
import { PostsApi } from '../../api/PostsApi';

test('GET - should return 404 for non-existing post', async ({ request }) => {
  const postsApi = new PostsApi(request);

  const response = await postsApi.getPost(999999);

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({});
});

test('PATCH - invalid endpoint should return 404', async ({ request }) => {
  const response = await request.patch('/invalid-endpoint', {
    data: { title: 'Test' },
  });

  expect(response.status()).toBe(404);
});
