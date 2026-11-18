import { test as base, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

type ApiFixtures = {
  postsApi: PostsApi;
};

export const test = base.extend<ApiFixtures>({
  postsApi: async ({ request }, use) => {
    const postsApi = new PostsApi(request);
    await use(postsApi);
  },
});

export { expect };
