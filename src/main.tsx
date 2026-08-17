import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ClinicaApp } from './ClinicaApp.tsx';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClinicaApp />
  </StrictMode>
);
