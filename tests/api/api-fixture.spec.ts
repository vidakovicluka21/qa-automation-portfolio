import { test, expect } from '../../fixtures/api-fixtures';

test('GET post using custom API fixture', async ({ postsApi }) => {
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.id).toBe(1);
  expect(responseBody.title).toBeTruthy();
});
