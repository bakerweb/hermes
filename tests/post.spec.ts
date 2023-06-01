import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';
import { CreateUserResponse } from './types';
import axios from 'axios';

test('Post Request', async ({ page }) => {
  const data = {
    name: 'morpheus',
    job: 'leader',
  };
  const response = await hermes.post<CreateUserResponse>('https://reqres.in/api/users', { data });
  console.log(response);
  expect(response.name).toBe('morpheus');
});
