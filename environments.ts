export const environments = {
  firebase: {
    apiKey: 'AIzaSyD8e9ASBZgysaguowH_z7tqt-KpD7uWHfQ',
    authDomain: 'photoforge.firebaseapp.com',
    projectId: 'photoforge',
    storageBucket: 'photoforge.appspot.com',
    messagingSenderId: '268323267438',
    appId: '1:268323267438:web:97957a7d77f78185bbd77f',
    measurementId: 'G-2K4TWMV37T',
  },
  development: {
    apiUrl: 'http://localhost:5274',
  },
  production: {
    apiUrl: 'http://Photoforge.com',
  },
  apiUrl: 'http://localhost:5000',
};

type Enviroments = {
  development: { apiUrl: string };
  production: { apiUrl: string };
  apiUrl: string;
};
