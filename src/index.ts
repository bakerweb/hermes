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
export type Options<B = void> = {
  data?: B;
  fetch?: Fetch;
  headers?: { name: string; value: string }[];
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
    options?.headers?.forEach((header) => {
      this.globalOptions.headers.append(header.name, header.value);
    });
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
  options?: { data?: B; headers?: { name: string; value: string }[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'POST';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      if (!headers.get(header.name) && headers.get(header.name) !== header.value) {
        headers.append(header.name, header.value);
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
  options?: { data?: B; headers?: { name: string; value: string }[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'GET';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      if (!headers.get(header.name) && headers.get(header.name) !== header.value) {
        headers.append(header.name, header.value);
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

async function _delete<T = unknown>(
  url: string,
  options?: { headers?: { name: string; value: string }[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const method = 'DELETE';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      if (!headers.get(header.name) && headers.get(header.name) !== header.value) {
        headers.append(header.name, header.value);
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
  options?: { data?: B; headers?: { name: string; value: string }[]; fetch?: Fetch },
) {
  // set fetch
  const customFetch = options?.fetch ? options.fetch : fetch;
  const { data } = options?.data ? options : { data: false };
  const method = 'PUT';
  // set headers
  const headers = globalOptions.headers;
  if (options?.headers) {
    options.headers.forEach((header) => {
      if (!headers.get(header.name) && headers.get(header.name) !== header.value) {
        headers.append(header.name, header.value);
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
