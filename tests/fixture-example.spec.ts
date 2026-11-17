import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  testUser: {
    username: string;
    role: string;
  };
};

const test = base.extend<MyFixtures>({
  testUser: async ({}, use) => {
    const user = {
      username: 'qa_tester',
      role: 'ADMIN'
    };

    await use(user);
  }
});

test('Custom Fixture - user has admin role', async ({ testUser }) => {
  expect(testUser.username).toBe('qa_tester');
  expect(testUser.role).toBe('ADMIN');

  console.log(`Username: ${testUser.username}`);
  console.log(`Role: ${testUser.role}`);
});
