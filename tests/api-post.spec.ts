import { test, expect } from '@playwright/test';

const postData = {
  title: 'My first API test',
  body: 'Learning Playwright',
  userId: 1
}

test('POST request creates a new post', async ({ request }) => {

  const response = await request.post(
    'https://jsonplaceholder.typicode.com/posts',
    {
        data: postData
    }
  );

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.title).toBe(postData.title);
  expect(responseBody.body).toBe(postData.body);
  expect(responseBody.userId).toBe(postData.userId);
  expect(responseBody).toHaveProperty('id');

});

test('POST request creates a new post with different data', async ({ request }) => {

    const postData = {
      title: 'QA Automation Engineer',
      body: 'Testing REST API with Playwright',
      userId: 5
    }

    const response = await request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: postData
      }
    );
  
    expect(response.status()).toBe(201);
  
    const responseBody = await response.json();
  
    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);
    expect(responseBody).toHaveProperty('id');
  
  });