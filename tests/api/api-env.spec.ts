import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('GET - API using environment variable', async ({ request }) => {
  const baseURL = process.env.API_BASE_URL;

  expect(baseURL).toBeDefined();

  const response = await request.get('/posts/1');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.id).toBe(1);

  console.log(`API Base URL: ${baseURL}`);
});