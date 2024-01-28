export const environments: Enviroments = {
  development: {
    apiUrl: 'http://localhost:5072',
  },
  production: {
    apiUrl: 'http://Photoforge.com',
  },
};

type Enviroments = {
  development: { apiUrl: string };
  production: { apiUrl: string };
};
