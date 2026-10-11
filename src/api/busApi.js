import api from './axiosConfig';

export const searchBuses = (params) => api.get('/buses/search', { params }).then((r) => r.data);
export const getBus = (id) => api.get(`/buses/${id}`).then((r) => r.data);
export const getSeats = (id) => api.get(`/buses/${id}/seats`).then((r) => r.data);

export const getAllBuses = () => api.get('/buses').then((r) => r.data);

export const createBus = (data) => api.post('/buses', data).then((r) => r.data);