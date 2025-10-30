import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experienceAPI = {
  getAll: () => api.get('/experiences'),
  getById: (id: string) => api.get(`/experiences/${id}`),
};

export const bookingAPI = {
  create: (data: any) => api.post('/bookings', data),
};

export const promoAPI = {
  validate: (code: string, amount: number) => 
    api.post('/promo/validate', { code, amount }),
};

export default api;