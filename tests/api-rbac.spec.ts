import { test, expect } from '@playwright/test';

function canDeleteUser(role: string): boolean {
  return role === 'ADMIN';
}

test('RBAC - admin can delete users', async () => {
  const role = 'ADMIN';

  const result = canDeleteUser(role);

  expect(result).toBe(true);
});

test('RBAC - regular user cannot delete users', async () => {
  const role = 'USER';

  const result = canDeleteUser(role);

  expect(result).toBe(false);
});
