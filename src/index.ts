// * This is a lightweight implementation that works off browser fetch or any custom fetch you pass in
/*
 * use example
 * import {hermes} from 'hermes'
 * hermes.post('http://localhost:3001/api/v1/get-user, {data: {userId: 134}})
 */
export const hermes = {
  post,
  put,
  delete: _delete,
  get,
};

type Fetch = {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};
declare const Fetch: {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};

async function post<T>(url: string, options?: { data?: unknown; headers?: Headers; fetch?: Fetch }) {
  // set headers
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'POST';
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function get<T>(url: string, options?: { data?: unknown; headers?: Headers; fetch?: Fetch }) {
  // set headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'GET';
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function _delete<T>(url: string, options?: { data?: unknown; headers?: Headers; fetch?: Fetch }) {
  // set headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'DELETE';
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function put<T>(url: string, options?: { data?: unknown; headers?: Headers; fetch?: Fetch }) {
  // Set headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'PUT';
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...options?.headers,
        ...headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function resolveHelper<T>(fetchResult: Response) {
  if (fetchResult.ok) {
    let fetchResolved: Promise<T | string>;
    const contentType = fetchResult.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      fetchResolved = fetchResult.json() as Promise<T>;
    } else {
      fetchResolved = fetchResult.text();
    }
    return fetchResolved;
  } else {
    const errorMessage = await fetchResult.text();
    return Promise.reject(new Error(errorMessage));
  }
}
