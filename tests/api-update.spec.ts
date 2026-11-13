import { test, expect } from '@playwright/test';

test('PUT request updates a post', async ({ request }) => {

  const updatedPost = {
    id: 1,
    title: 'Updated title',
    body: 'Updated content',
    userId: 1
  };

  const response = await request.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    { data: updatedPost }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(updatedPost.id);
  expect(responseBody.title).toBe(updatedPost.title);
  expect(responseBody.body).toBe(updatedPost.body);
  expect(responseBody.userId).toBe(updatedPost.userId);

});

test('PATCH request updates a post title', async ({ request }) => {

  const updatedPost = {
    title: 'Updated using PATCH', 
  };

  const response = await request.patch(
    'https://jsonplaceholder.typicode.com/posts/1',
    { data: updatedPost }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.title).toBe(updatedPost.title);
  expect(responseBody.id).toBe(1);

});