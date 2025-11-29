import axiosClient from './axiosClient';

const targetApi = {
  createTarget: (data) => axiosClient.post('/target/', data),
  getTarget: () => axiosClient.get('/target/'),
  updateTarget: (data) => axiosClient.put('/target/', data),
};

export default targetApi;
