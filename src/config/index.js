import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://filmopedia.herokuapp.com'
});

instance.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;