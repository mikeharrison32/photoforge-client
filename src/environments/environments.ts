export const environments: Enviroments = {
  development: {
    apiUrl: 'http://localhost:5274',
  },
  production: {
    apiUrl: 'http://Photoforge.com',
  },
  apiUrl: 'http://localhost:5274',
};

type Enviroments = {
  development: { apiUrl: string };
  production: { apiUrl: string };
  apiUrl: string;
};
