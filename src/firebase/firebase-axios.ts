import axios, { AxiosRequestConfig } from 'axios';
import firebase from 'firebase';

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
