import axios from 'axios';

// Instancia unica hacia el api-gateway (puerto 8080): el gateway enruta por Path hacia
// pacientes/expedientes/citas/recetas/auditoria-service, asi que un solo baseURL alcanza.
const clinicaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

clinicaApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default clinicaApi;
