export type CustomConfig = {
  method?: 'POST' | 'GET',
  body?: string,
  headers: {
    'Content-Type': string,
  },
};

const client = <T>(endpoint: string, { body, ...customConfig }: Partial<CustomConfig>) => {
  const headers = { 'Content-Type': 'application/json' };
  const config: CustomConfig = {
    ...customConfig,
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    body: JSON.stringify(body)
  };

  return fetch(endpoint, config)
    .then(async (response) => {
      if (response.ok) {
        return response.json() as Promise<T>;
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    });
};

export default client;
