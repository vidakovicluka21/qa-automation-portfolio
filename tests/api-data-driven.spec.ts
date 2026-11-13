import { test, expect } from '@playwright/test';
import { PostsApi } from '../api/PostsApi';

const postIds = [1, 2, 3, 10];

for (const postId of postIds) {
  test(`GET - should return post ${postId}`, async ({ request }) => {
    const postsApi = new PostsApi(request);

    const response = await postsApi.getPost(postId);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(postId);
  });
}

const testCases = [
    { id: 1, expectedStatus: 200 },
    { id: 5, expectedStatus: 200 },
    { id: 999999, expectedStatus: 404 }
  ];
  

  for (const testCase of testCases) {
    test(`GET - post ${testCase.id} should return ${testCase.expectedStatus}`, async ({ request }) => {
      const postsApi = new PostsApi(request);
  
      const response = await postsApi.getPost(testCase.id);
  
      expect(response.status()).toBe(testCase.expectedStatus);
  
      const responseBody = await response.json();
  
      if (testCase.expectedStatus === 200) {
        expect(responseBody.id).toBe(testCase.id);
        expect(responseBody.title).toBeTruthy();
        expect(responseBody.body).toBeTruthy();
      } else if (testCase.expectedStatus === 404) {
        expect(responseBody).toEqual({});
      }
    });
  }
  