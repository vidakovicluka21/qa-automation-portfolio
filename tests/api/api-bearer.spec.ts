import { test, expect } from '@playwright/test';

test('Bearer Token - send authorization header', async ({ request }) => {
  const token = 'demo-token-123';

  const response = await request.get(
    'https://httpbin.org/headers',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.headers.Authorization).toBe(
    `Bearer ${token}`
  );
});

test('Bearer Token - missing token returns 401', async ({ request }) => {
    const response = await request.get(
      'https://httpbin.org/bearer'
    );
  
    expect(response.status()).toBe(401);
  });
  
test('Bearer Token - valid token returns 200', async ({ request }) => {
    const token = 'demo-token-123';
  
    const response = await request.get(
      'https://httpbin.org/bearer',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  
    expect(response.status()).toBe(200);
  
    const responseBody = await response.json();
  
    expect(responseBody.authenticated).toBe(true);
    expect(responseBody.token).toBe(token);
  });
  