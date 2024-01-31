export const environments: Enviroments = {
  development: {
    apiUrl: 'http://localhost:5274',
  },
  production: {
    apiUrl: 'http://Photoforge.com',
  },
};

type Enviroments = {
  development: { apiUrl: string };
  production: { apiUrl: string };
};
