import { test, expect } from '@playwright/test';

test('GET /users - performance criteria', async ({ request }) => {
  const responseTimes: number[] = [];

  for (let i = 0; i < 10; i++) {
    const startTime = Date.now();

    const response = await request.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    const responseTime = Date.now() - startTime;

    expect(response.status()).toBe(200);

    responseTimes.push(responseTime);

    console.log(`Request ${i + 1}: ${responseTime}ms`);
  }

  const totalTime = responseTimes.reduce((sum, time) => sum + time, 0);
  const averageTime = totalTime / responseTimes.length;

  const minTime = Math.min(...responseTimes);
  const maxTime = Math.max(...responseTimes);

  console.log(`Average response time: ${averageTime}ms`);
  console.log(`Fastest response time: ${minTime}ms`);
  console.log(`Slowest response time: ${maxTime}ms`);

  expect(averageTime).toBeLessThan(500);
  expect(maxTime).toBeLessThan(1000);
});
