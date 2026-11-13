    import { test, expect } from '@playwright/test';

    interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    }

    interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    }

    test('GET post returns correct data types', async ({ request }) => {

    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);

    const responseBody: Post = await response.json();

    expect(typeof responseBody.id).toBe('number');
    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.body).toBe('string');
    expect(typeof responseBody.userId).toBe('number');

    });

    test('GET user returns correct data types', async ({ request }) => {

    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);

    const responseBody: User = await response.json();

    expect(typeof responseBody.id).toBe('number');
    expect(typeof responseBody.name).toBe('string');
    expect(typeof responseBody.username).toBe('string');
    expect(typeof responseBody.email).toBe('string');
    expect(responseBody.id).toBe(1);
    expect(responseBody.email).toContain('@');
    });