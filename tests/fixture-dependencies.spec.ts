import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  user: {
    id: number;
    username: string;
  };
  userProfile: {
    userId: number;
    username: string;
    role: string;
  };
};

const test = base.extend<MyFixtures>({
  user: async ({}, use) => {
    console.log('SETUP: Creating user');

    const user = {
      id: 1,
      username: 'qa_tester'
    };

    await use(user);

    console.log('TEARDOWN: User finished');
  },

  userProfile: async ({ user }, use) => {
    console.log('SETUP: Creating user profile');

    const profile = {
      userId: user.id,
      username: user.username,
      role: 'ADMIN'
    };

    await use(profile);

    console.log('TEARDOWN: User profile finished');
  }
});

test('Fixture dependencies - user profile', async ({ userProfile }) => {
  console.log('Running test');

  expect(userProfile.userId).toBe(1);
  expect(userProfile.username).toBe('qa_tester');
  expect(userProfile.role).toBe('ADMIN');
});
