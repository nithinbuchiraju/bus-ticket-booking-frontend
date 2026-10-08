import api from './axiosConfig';

export const createBooking = (data) => api.post('/bookings', data).then((r) => r.data);
export const getMyBookings = () => api.get('/bookings/my').then((r) => r.data);
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`).then((r) => r.data);
