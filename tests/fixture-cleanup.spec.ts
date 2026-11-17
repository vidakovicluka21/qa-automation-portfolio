import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  testData: string[];
};

const test = base.extend<MyFixtures>({
  testData: async ({}, use) => {
    const data = ['user1', 'user2', 'user3'];

    console.log('SETUP: Test data created');

    try {
      await use(data);
    } finally {
      data.length = 0;

      console.log('TEARDOWN: Test data cleared');
    }
  },
});

test('Fixture cleanup example', async ({ testData }) => {
  expect(testData).toHaveLength(3);

  console.log(`Users during test: ${testData.length}`);
});
