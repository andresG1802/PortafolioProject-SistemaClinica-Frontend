import { BuscadorAuditoria } from '../components/BuscadorAuditoria';
import { RegistroAuditoriaTable } from '../components/RegistroAuditoriaTable';
import { RegistroFormModal } from '../components/RegistroFormModal';
import { useAuditoriaStore } from '../../hooks';

export const AuditoriaPage = () => {
  const { openRegistroModal } = useAuditoriaStore();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Auditoría</h1>
        <button type="button" className="btn btn-primary" onClick={openRegistroModal}>
          + Registrar manualmente
        </button>
      </div>

      <BuscadorAuditoria />

      <div className="section-block">
        <RegistroAuditoriaTable />
      </div>

      <RegistroFormModal />
    </div>
  );
};
