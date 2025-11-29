import axiosClient from './axiosClient';

const userApi = {
  getMe: () => axiosClient.get('/auth/me'),
};

export default userApi;
