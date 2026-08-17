import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

import { useAuthStore } from '../../hooks';
import { fadeInUp } from '../../styles/motion';
import './LoginPage.css';

export const LoginPage = () => {
  const { status, errorMessage, startLogin } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isChecking = status === 'checking';

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) return;
    startLogin({ username, password });
  };

  return (
    <div className="login-page">
      <motion.div className="login-card" variants={fadeInUp} initial="initial" animate="animate">
        <h1>Historia Clínica Electrónica</h1>
        <p>Ingresa con tu usuario de Keycloak</p>

        {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="dr.garcia"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary login-submit" disabled={isChecking}>
            {isChecking && <span className="spinner" />}
            Ingresar
          </button>
        </form>

        <div className="login-hint">
          <strong>Usuarios de prueba:</strong>
          <span>dr.garcia / medico123 (MEDICO)</span>
          <span>enf.lopez / enfermero123 (ENFERMERO)</span>
          <span>admin.sistema / admin123 (ADMIN)</span>
          <span>paciente.torres / paciente123 (PACIENTE)</span>
        </div>
      </motion.div>
    </div>
  );
};
