# Hermes v1.0.7

[![Node.js CI](https://github.com/bakerweb/hermes/actions/workflows/node.js.yml/badge.svg)](https://github.com/bakerweb/hermes/actions/workflows/node.js.yml)

Lightweight fetch wrapper built with typescript.

Node v17.5.0+ is recommended as this module uses fetch. If you are using < v18.0 you must use `--experimental-fetch`.

If you are using a Node version below v17.5.0+ Check the [Using Options](#using-options) example for how to use a custom fetch which will allow you to use older versions of Node.

## Installation

`npm install @bakerwebsolutions/hermes`

## Examples

### Get Request

```
import hermes from '@bakerwebsolutions/hermes'

const getRequestResponse = hermes.get('https://reqres.in/api/users?page=2)

console.log(getRequestResponse)
```

### Post Request

```
import hermes from '@bakerwebsolutions/hermes'

const postRequestResponse = hermes.post('https://reqres.in/api/users', {
    data: {
        name: 'John',
        job: 'driver'
    }
})

console.log(postRequestResponse)
```

### Using Options

```
import hermes from '@bakerwebsolutions/hermes'
import fetch from 'node-fetch'

const data = {
    name: 'John',
    job: 'driver'
}
const options = {
    headers: 'Content-Type': 'application/json', // Default Content-Type header is application/json
    data,
    fetch
}
const postRequestResponse = hermes.post('https://reqres.in/api/users', options)
```

### Global Configuration

To set options like headers or fetch globally you can create a file and import the Hermes class

```
import { Hermes } from '@bakerwebsolutions/hermes'

const options = {
  headers: [{ name: 'Content-Type', value: 'application/json' }, { name: 'Authorization', value: 'token'}]
}

const hermes = new Hermes(options)

export default hermes
```

Then use your custom hermes configuration just replace the path.

```
import hermes from '<path/to/custom/hermes>'

const getUsersResponse = hermes.get('https://reqres.in/api/users')

console.log(getUsersResponse)
```

### Using With Typescript

Global Headers Configuration

```
import { Hermes, type Options } from '@bakerwebsolutions/hermes'

const options: Options = {
  headers: [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'Authorization', value: 'token'}
  ]
}

const hermes = new Hermes(options)

export default hermes
```

Get Request

```
import hermes from '@bakerwebsolutions/hermes'
import type { GetUserResponse } from './types';

hermes.get<GetUserResponse>('https://reqres.in/api/users')
```

Post Request

```
import hermes from '@bakerwebsolutions/hermes'

type Data = {
  name: string;
  job: string;
};

const data = {
    name: 'mobius',
    job: 'secret',
};

const postResponse = await hermes.post<CreateUserResponse, Data>('https://reqres.in/api/users', { data });

console.log(postResponse)
```

## Development

Clone the repository

`git clone https://github.com/bakerweb/hermes.git`

Install dependencies

`npm install`

Run Tests

`npm run test`
