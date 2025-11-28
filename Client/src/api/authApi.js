import axiosClient from './axiosClient';

const authApi = {
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  register: (userData) => axiosClient.post('/auth/register', userData),
  logout: () => axiosClient.post('/auth/logout'),
  getCurrentUser: () => axiosClient.get('/auth/me'),
};

export default authApi;
