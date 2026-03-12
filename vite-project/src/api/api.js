import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Users
export const createUser = (data) => API.post('/users/create', data);
export const getUsers = () => API.get('/users');
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Events
export const createEvent = (data) => API.post('/events/create', data);
export const getEvents = () => API.get('/events');
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Registrations
export const createRegistration = (data) => API.post('/registrations/create', data);
export const getRegistrations = () => API.get('/registrations');
export const updateRegistration = (id, data) => API.put(`/registrations/${id}`, data);
export const deleteRegistration = (id) => API.delete(`/registrations/${id}`);
