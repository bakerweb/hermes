import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';
import { UpdateUserResponse } from './types';

test('Delete Request', async ({ page }) => {
  const response = await hermes.delete<UpdateUserResponse>('https://reqres.in/api/users/2');
  console.log(response);
  //   expect(response.name).toBe('morpheus');
});
