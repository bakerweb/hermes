import { expect, test } from '@playwright/test';
import { hermes } from '../src/index';
import { CreateUserResponse } from './types';
type Data = {
  name: string;
  job: string;
};
test('Post Request', async () => {
  const data = {
    name: 'mobius',
    movies: ['XD'],
  };
  const response = await hermes.post<CreateUserResponse, Data>('https://reqres.in/api/users', { data });
  expect(response).toHaveProperty('id');
});
