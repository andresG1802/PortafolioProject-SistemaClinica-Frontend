import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Toast } from '../components/Toast';
import { fadeInUp } from '../../styles/motion';
import { useAuthStore } from '../../hooks';
import { esAdmin } from '../../helpers';

import { PacientesPage } from '../../pacientes';
import { ExpedientesPage } from '../../expedientes';
import { CitasPage } from '../../citas';
import { RecetasPage } from '../../recetas';
import { AuditoriaPage } from '../../auditoria';

export const DashboardLayout = () => {
  const location = useLocation();
  const { roles } = useAuthStore();

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-content">
        <Navbar />
        <Toast />

        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} variants={fadeInUp} initial="initial" animate="animate" exit="exit">
            <Routes location={location}>
              <Route path="/pacientes" element={<PacientesPage />} />
              <Route path="/expedientes" element={<ExpedientesPage />} />
              <Route path="/citas" element={<CitasPage />} />
              <Route path="/recetas" element={<RecetasPage />} />
              <Route path="/auditoria" element={esAdmin(roles) ? <AuditoriaPage /> : <Navigate to="/pacientes" />} />
              <Route path="*" element={<Navigate to="/pacientes" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
