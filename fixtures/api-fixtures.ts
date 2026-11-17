import { test as base, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

type ApiFixtures = {
  postsApi: PostsApi;
};

export const test = base.extend<ApiFixtures>({
    postsApi: async ({ request }, use) => {
        console.log('SETUP: Creating PostsApi client');

        const postsApi = new PostsApi(request);

        await use(postsApi);

        console.log('TEARDOWN: PostsApi fixture finished');
    },
});

export { expect };
