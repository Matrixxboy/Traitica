import axiosClient from './axiosClient';

const targetApi = {
  createTarget: (data) => axiosClient.post('/target/', data),
  getTargets: () => axiosClient.get('/target/'),
  updateTarget: (id, data) => axiosClient.put(`/target/${id}`, data),
};

export default targetApi;
