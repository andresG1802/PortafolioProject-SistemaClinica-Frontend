import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { DashboardLayout } from '../layout';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return (
      <div className="center-page">
        <div className="spinner spinner-dark" />
      </div>
    );
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<DashboardLayout />} />
      )}

      <Route path="*" element={<Navigate to={status === 'authenticated' ? '/' : '/auth/login'} />} />
    </Routes>
  );
};
