const hermes = {
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

async function post<T = unknown, B = unknown>(url: string, options?: { data?: B; headers?: Headers; fetch?: Fetch }) {
  // Set headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
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
        ...headers,
        ...options?.headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function get<T = unknown, B = unknown>(url: string, options?: { data?: B; headers?: Headers; fetch?: Fetch }) {
  // Set headers
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
        ...headers,
        ...options?.headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function _delete<T = unknown>(url: string, options?: { headers?: Headers; fetch?: Fetch }) {
  // Set headers
  const headers = new Headers({ 'Content-Type': 'application/json' });
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const method = 'DELETE';
  // make request
  const fetchResult = await customFetch(url, {
    method,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function put<T = unknown, B = unknown>(url: string, options?: { data?: B; headers?: Headers; fetch?: Fetch }) {
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
        ...headers,
        ...options?.headers,
      },
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });
  }
  // resolve request
  return await resolveHelper<T>(fetchResult);
}

async function resolveHelper<T>(fetchResult: Response) {
  if (fetchResult.ok) {
    let fetchResolved: Promise<T>;
    if (fetchResult.status === 204) {
      fetchResolved = Promise.resolve('No Content') as Promise<T>;
    } else {
      const contentType = fetchResult.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        fetchResolved = fetchResult.json() as Promise<T>;
      } else {
        fetchResolved = fetchResult.text() as Promise<T>;
      }
    }
    return fetchResolved;
  } else {
    const errorMessage = await fetchResult.text();
    return Promise.reject(new Error(errorMessage));
  }
}

export default hermes;
