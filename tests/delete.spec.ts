import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';

test('Delete Request', async ({ page }) => {
  const response = await hermes.delete<string>('https://reqres.in/api/users/2');
  expect(response).toBe('No Content');
});
