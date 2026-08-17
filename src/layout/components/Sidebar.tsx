import { NavLink } from 'react-router-dom';

import { useAuthStore } from '../../hooks';
import { esAdmin } from '../../helpers';

const links = [
  { to: '/pacientes', label: 'Pacientes' },
  { to: '/expedientes', label: 'Expedientes' },
  { to: '/citas', label: 'Citas' },
  { to: '/recetas', label: 'Recetas' },
];

export const Sidebar = () => {
  const { roles } = useAuthStore();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">🩺 Clínica</div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
        {esAdmin(roles) && (
          <NavLink to="/auditoria" className={({ isActive }) => `sidebar-link${isActive ? ' sidebar-link-active' : ''}`}>
            Auditoría
          </NavLink>
        )}
      </nav>
    </aside>
  );
};
