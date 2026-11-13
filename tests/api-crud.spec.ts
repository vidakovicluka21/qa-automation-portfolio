import { test, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

test('GET - should retrieve an existing post', async ({ request }) => {
    const postsApi = new PostsApi(request);
  
    const response = await postsApi.getPost(1);
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
  
    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBeDefined();
    expect(responseBody.body).toBeDefined();
  });

test('POST - should create a new post', async ({ request }) => {
  const postsApi = new PostsApi(request);

  const response = await postsApi.createPost(
    'Learning Playwright',
    'This is my first POST API test',
    1
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.title).toBe('Learning Playwright');
  expect(responseBody.body).toBe('This is my first POST API test');
  expect(responseBody.userId).toBe(1);
  expect(responseBody.id).toBeDefined();
});

test('PUT - should update an existing post', async ({ request }) => {
    const postsApi = new PostsApi(request);
  
    const response = await postsApi.updatePost(
      1,
      'Updated Playwright Title',
      'This post was updated using PUT',
      1
    );
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
  
    expect(responseBody.id).toBe(1);
    expect(responseBody.title).toBe('Updated Playwright Title');
    expect(responseBody.body).toBe('This post was updated using PUT');
    expect(responseBody.userId).toBe(1);
  });

  test('DELETE - should delete an existing post', async ({ request }) => {
    const postsApi = new PostsApi(request);
  
    const response = await postsApi.deletePost(1);
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
  
    expect(responseBody).toEqual({});
  });