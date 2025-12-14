import axios from 'axios';
import { siteConfig } from '../config/site';

const api = axios.create({
  baseURL: siteConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Company Info
export const getCompanyInfo = async () => {
  const response = await api.get('/company-info/');
  return response.data;
};

// Services
export const getServices = async () => {
  const response = await api.get('/services/');
  return response.data;
};

export const getService = async (slug) => {
  const response = await api.get(`/services/${slug}/`);
  return response.data;
};

// Projects
export const getProjects = async (params = {}) => {
  const response = await api.get('/projects/', { params });
  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await api.get('/projects/featured/');
  return response.data;
};

export const getProject = async (slug) => {
  const response = await api.get(`/projects/${slug}/`);
  return response.data;
};

// Testimonials
export const getTestimonials = async () => {
  const response = await api.get('/testimonials/');
  return response.data;
};

// Gallery
export const getGalleryImages = async () => {
  const response = await api.get('/gallery/');
  return response.data;
};

export const getHeroImages = async () => {
  const response = await api.get('/gallery/hero/');
  return response.data;
};

// Contact
export const sendContactMessage = async (data) => {
  const response = await api.post('/contact/', data);
  return response.data;
};

export default api;
