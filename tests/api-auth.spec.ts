
import { test, expect } from '@playwright/test';
import { Buffer } from 'node:buffer';

test('Basic Auth - valid credentials', async ({ request }) => {
  const credentials = Buffer.from('admin:password123').toString('base64');

  const response = await request.get(
    'https://httpbin.org/basic-auth/admin/password123',
    {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.authenticated).toBe(true);
  expect(responseBody.user).toBe('admin');
});

test('Basic Auth - invalid password', async ({ request }) => {
    const credentials = Buffer.from('admin:wrongpassword').toString('base64');
  
    const response = await request.get(
      'https://httpbin.org/basic-auth/admin/password123',
      {
        headers: {
          Authorization: `Basic ${credentials}`
        }
      }
    );
  
    expect(response.status()).toBe(401);
  });

  test('Basic Auth - missing credentials', async ({ request }) => {
    const response = await request.get(
      'https://httpbin.org/basic-auth/admin/password123'
    );
  
    expect(response.status()).toBe(401);
  });
  
  