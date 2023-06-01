import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';
import { GetUserResponse } from './types';

test('Get Request', async () => {
  const response = await hermes.get<GetUserResponse>('https://reqres.in/api/users?page=2');
  expect(response.page).toBe(2);
});
