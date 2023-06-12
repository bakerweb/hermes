const globalOptions: GlobalOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' }),
};

type Fetch = {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};
declare const Fetch: {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
};
type RawHeaders = {
  name: string;
  value: string;
};
export type Options<B = void> = {
  data?: B;
  fetch?: Fetch;
  headers?: RawHeaders[];
};
type GlobalOptions<B = void> = {
  data?: B;
  fetch?: Fetch;
  headers: Headers;
};

export class Hermes {
  post: typeof post;
  put: typeof put;
  delete: typeof _delete;
  get: typeof get;
  globalOptions;
  constructor(options?: Options) {
    this.post = post;
    this.put = put;
    this.delete = _delete;
    this.get = get;
    this.globalOptions = globalOptions;
    if (options?.headers) {
      for (let i = 0; i < options.headers.length; i++) {
        const key = options.headers[i].name;
        if (this.globalOptions.headers.has(key)) {
          this.globalOptions.headers.set(key, options.headers[i].value);
        } else {
          this.globalOptions.headers.append(key, options.headers[i].value);
        }
      }
    }
  }
}

const hermes = {
  post,
  put,
  delete: _delete,
  get,
  globalOptions,
};

export default hermes;

async function post<T = unknown, B = unknown>(
  url: string,
  options?: { data?: B; headers?: RawHeaders[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'POST';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      const key = header.name;
      if (!headers.has(key)) {
        headers.append(key, header.value);
      } else {
        headers.set(key, header.value);
      }
    });
  }
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function get<T = unknown, B = unknown>(
  url: string,
  options?: { data?: B; headers?: RawHeaders[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'GET';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      const key = header.name;
      if (!headers.has(key)) {
        headers.append(key, header.value);
      } else {
        headers.set(key, header.value);
      }
    });
  }
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
    });
  }
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function _delete<T = unknown>(url: string, options?: { headers?: RawHeaders[]; fetch?: Fetch }) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const method = 'DELETE';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      const key = header.name;
      if (!headers.has(key)) {
        headers.append(key, header.value);
      } else {
        headers.set(key, header.value);
      }
    });
  }
  // make request
  const fetchResult = await customFetch(url, {
    method,
    headers: headers,
  });
  // resolve request
  return resolveHelper<T>(fetchResult);
}

async function put<T = unknown, B = unknown>(
  url: string,
  options?: { data?: B; headers?: RawHeaders[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'PUT';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      const key = header.name;
      if (!headers.has(key)) {
        headers.append(key, header.value);
      } else {
        headers.set(key, header.value);
      }
    });
  }
  // make request
  let fetchResult: Response;
  if (data) {
    const body = JSON.stringify(data);
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
      body,
    });
  } else {
    fetchResult = await customFetch(url, {
      method,
      headers: headers,
    });
  }
  // resolve request
  return await resolveHelper<T>(fetchResult);
}

async function resolveHelper<T = unknown>(fetchResult: Response) {
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
