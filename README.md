# Hermes v1.0.0

[![Node.js CI](https://github.com/bakerweb/hermes/actions/workflows/node.js.yml/badge.svg)](https://github.com/bakerweb/hermes/actions/workflows/node.js.yml)

Lightweight fetch wrapper. Node v17.5.0+ is recommended as this module uses fetch.

Check the [Using Options](#using-options) example for how to use a custom fetch which will allow you to use older versions of Node.

## Installation

`npm install @bakerwebsolutions/hermes`

## Examples

### Get Request

```
import hermes from '@bakerwebsolutions/hermes'

const getRequestResponse = hermes.get('https://reqres.in/api/users?page=2)
```

### Post Request

```
import hermes from '@bakerwebsolutions/hermes'

const postRequestResponse = hermes.post('https://reqres.in/api/users', {data: {
    name: 'John',
    job: 'driver'
}})
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
    headers: 'Content-Type': 'application/json' // Default Content-Type header is application/json,
    fetch
}
const postRequestResponse = hermes.post('https://reqres.in/api/users', options, {data})
```

## Development

Clone the repository

`git clone https://github.com/bakerweb/hermes.git`

Install dependencies

`npm install`

Run Tests

`npm run test`
