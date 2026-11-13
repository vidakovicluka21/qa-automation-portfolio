import { test, expect } from '@playwright/test';
import type { Post } from '../types/Post';
import { newPostData } from '../test-data/postData';

// Write GET test
test('GET post returns correct data', async ({ request }) => {

  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);

  const responseBody: Post = await response.json();

  expect(responseBody.id).toBe(1);
  expect(typeof responseBody.title).toBe('string');
  expect(typeof responseBody.body).toBe('string');
});

// Write POST test
test('POST post returns correct data', async ({ request }) => {

  const response = await request.post('/posts', { data: newPostData });

  expect(response.status()).toBe(201);

  const responseBody: Post = await response.json();

  expect(typeof responseBody.title).toBe('string');
  expect(typeof responseBody.body).toBe('string');
  expect(typeof responseBody.userId).toBe('number');
  expect(responseBody.title).toBe(newPostData.title);
  expect(responseBody.body).toBe(newPostData.body);
  expect(responseBody.userId).toBe(newPostData.userId);
});