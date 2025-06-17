import axios, {AxiosError} from 'axios';

const config = {
  headers: {
    "Content-type": "application/json",
    "Accept-Language": "ru"
  },
  baseURL: 'https://api.example.com'
};

const instance = axios.create(config);

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config?.headers) {
        // Authorization: `Bearer ${user.token}`
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            location.reload();
        }
        throw error;
    }
);

export default instance;
