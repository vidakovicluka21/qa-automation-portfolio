import { test, expect } from '@playwright/test';

test.describe('API POST Tests', () => {

  let postData: {
    title: string;
    body: string;
    userId: number;
  };

  test.beforeEach(() => {

    // TODO: Assign test data to postData
    postData = {
      title: 'Test Post',
      body: 'Test Body',
      userId: 1
    };
  });

  test('POST returns 201', async ({ request }) => {

    // TODO: Send POST request
    const response = await request.post('/posts', { data: postData });
    // TODO: Verify status
    expect(response.status()).toBe(201);

  });

  test('POST returns correct data', async ({ request }) => {

    // TODO: Send POST request
    const response = await request.post('/posts', { data: postData });
    // TODO: Verify status
    expect(response.status()).toBe(201);
    // TODO: Parse JSON
    const responseBody = await response.json();
    // TODO: Verify title, body and userId
    expect(responseBody.title).toBe(postData.title);
    expect(responseBody.body).toBe(postData.body);
    expect(responseBody.userId).toBe(postData.userId);
  });

});