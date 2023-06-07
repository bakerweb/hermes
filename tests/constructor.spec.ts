import { expect, test } from '@playwright/test';
import { Hermes, type Options } from '../src/index';
import type { CreateUserResponse } from './types';

const options: Options = {};

const hermes = new Hermes(options);

type Data = {
  name: string;
  job: string;
};

test('Constructor Post Request', async () => {
  const data = {
    name: 'mobius',
    job: 'secret',
  };
  const response = await hermes.post<CreateUserResponse, Data>('https://reqres.in/api/users', { data });
  expect(response).toHaveProperty('id');
});
