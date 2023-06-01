import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';
import { UpdateUserResponse } from './types';

test('Put Request', async () => {
  const data = {
    name: 'morpheus',
    job: 'zion resident',
  };
  const response = await hermes.put<UpdateUserResponse>('https://reqres.in/api/users/2', { data });
  expect(response).toHaveProperty('updatedAt');
});
