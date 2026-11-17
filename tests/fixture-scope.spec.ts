
import { test as base, expect } from '@playwright/test';

type TestFixtures = {
  testData: string;
};

type WorkerFixtures = {
  workerData: string;
};

const test = base.extend<TestFixtures, WorkerFixtures>({
  testData: async ({}, use) => {
    console.log('TEST SETUP');

    await use('Individual test data');

    console.log('TEST TEARDOWN');
  },

  workerData: [
    async ({}, use) => {
      console.log('WORKER SETUP');

      await use('Shared worker data');

      console.log('WORKER TEARDOWN');
    },
    { scope: 'worker' },
  ],
});

test('Fixture scopes - Test 1', async ({ testData, workerData }) => {
  console.log('Running Test 1');

  expect(testData).toBe('Individual test data');
  expect(workerData).toBe('Shared worker data');
});

test('Fixture scopes - Test 2', async ({ testData, workerData }) => {
  console.log('Running Test 2');

  expect(testData).toBe('Individual test data');
  expect(workerData).toBe('Shared worker data');
});
