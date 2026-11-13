import { APIRequestContext } from '@playwright/test';

export class PostsApi {
  constructor(private request: APIRequestContext) {}

  async getPost(id: number) {
    return this.request.get(`/posts/${id}`);
  }

  async createPost(title: string, body: string, userId: number) {
    return this.request.post('/posts', {
      data: {
        title,
        body,
        userId
      }
    });
  }

  async updatePost(
    id: number,
    title: string,
    body: string,
    userId: number
  ) {
    return this.request.put(`/posts/${id}`, {
      data: {
        id,
        title,
        body,
        userId
      }
    });
  }

  async deletePost(id: number) {
    return this.request.delete(`/posts/${id}`);
  }

}