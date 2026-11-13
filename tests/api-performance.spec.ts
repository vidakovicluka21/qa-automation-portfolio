import { test, expect } from '@playwright/test';

test('GET - API should respond within 2000ms', async ({ request }) => {
  const startTime = Date.now();

  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  const endTime = Date.now();

  const responseTime = endTime - startTime;

  console.log(`Response time: ${responseTime}ms`);

  expect(response.status()).toBe(200);
  expect(responseTime).toBeLessThan(2000);
});

test('GET - average API response time', async ({ request }) => {
    const responseTimes: number[] = [];
  
    for (let i = 0; i < 20; i++) {
      const startTime = Date.now();
  
      const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts/1'
      );
  
      const responseTime = Date.now() - startTime;
  
      expect(response.status()).toBe(200);
  
      responseTimes.push(responseTime);
  
      console.log(`Request ${i + 1}: ${responseTime}ms`);
    }
  
    const totalTime = responseTimes.reduce(
      (sum, time) => sum + time,
      0
    );
  
    const averageTime = totalTime / responseTimes.length;
  
    console.log(`Average response time: ${averageTime}ms`);

    const sortedTimes = [...responseTimes].sort((a, b) => a - b);

    const minTime = sortedTimes[0];
    const maxTime = sortedTimes[sortedTimes.length - 1];

    const p95Index = Math.ceil(0.95 * sortedTimes.length) - 1;
    const p95Time = sortedTimes[p95Index];

    console.log(`Minimum response time: ${minTime}ms`);
    console.log(`Maximum response time: ${maxTime}ms`);
    console.log(`P95 response time: ${p95Time}ms`);

  
    expect(averageTime).toBeLessThan(2000);
  });
  