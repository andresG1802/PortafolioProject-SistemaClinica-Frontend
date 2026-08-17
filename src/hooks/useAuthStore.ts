import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import type { RootState, AppDispatch } from '../store';
import { onChecking, onLogin, onLogout } from '../store';
import { decodeJwt, extraerRoles, isTokenExpired } from '../helpers';

interface Credenciales {
  username: string;
  password: string;
}

export const useAuthStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, userId, username, roles, errorMessage } = useSelector((state: RootState) => state.auth);

  const startLogin = async (credenciales: Credenciales) => {
    dispatch(onChecking());
    try {
      const body = new URLSearchParams({
        grant_type: 'password',
        client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
        username: credenciales.username,
        password: credenciales.password,
      });

      const { data } = await axios.post<{ access_token: string }>(
        `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        body,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      localStorage.setItem('token', data.access_token);
      const decoded = decodeJwt(data.access_token);
      dispatch(onLogin({ userId: decoded.sub, username: decoded.preferred_username, roles: extraerRoles(data.access_token) }));
    } catch {
      localStorage.removeItem('token');
      dispatch(onLogout('Usuario o contraseña incorrectos'));
    }
  };

  const startLogout = () => {
    localStorage.removeItem('token');
    dispatch(onLogout(undefined));
  };

  // Rehidrata la sesion al recargar la pagina: si hay un token vigente en localStorage,
  // entra directo como autenticado sin volver a pedir usuario/password.
  const checkAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      dispatch(onLogout(undefined));
      return;
    }
    const decoded = decodeJwt(token);
    dispatch(onLogin({ userId: decoded.sub, username: decoded.preferred_username, roles: extraerRoles(token) }));
  };

  return {
    // Propiedades
    status,
    userId,
    username,
    roles,
    errorMessage,

    // Metodos
    startLogin,
    startLogout,
    checkAuthToken,
  };
};
