import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { username, roles, startLogout } = useAuthStore();

  return (
    <header className="navbar">
      <span className="navbar-title">Historia Clínica Electrónica</span>

      <div className="navbar-user">
        <div className="navbar-user-info">
          <span className="navbar-username">{username}</span>
          <span className="navbar-roles">{roles.join(' · ')}</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={startLogout}>
          Salir
        </button>
      </div>
    </header>
  );
};
