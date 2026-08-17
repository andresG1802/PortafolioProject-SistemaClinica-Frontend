# Historia Clínica Electrónica — Frontend (React + TypeScript + Vite)

Frontend para `PortafolioProject-SistemaClinica-Backend`. Es el mismo patrón que
`PortafolioProject-SistemaBancario-Frontend`: estructura de carpetas del repo
[react-mern-calendar](https://github.com/Klerith/react-mern-calendar) (feature folders con
`components/` + `pages/` + barrel `index.ts`, un slice de Redux Toolkit por dominio en
`store/`, un hook por dominio en `hooks/`), adaptado a los 5 dominios de la clínica, con
Framer Motion para las animaciones.

## Stack

Vite (v6, Rollup) + React 19 + TypeScript, Yarn, Redux Toolkit + React Redux, React Router,
Axios, Framer Motion, date-fns.

## Como levantarlo

Requiere el backend corriendo (`PortafolioProject-SistemaClinica-Backend`: Postgres + Keycloak
via `docker compose up -d`, y los servicios Java: eureka, gateway, pacientes, expedientes,
citas, recetas, auditoria).

```bash
yarn install
yarn dev       # http://localhost:5173
```

Variables de entorno (`.env`, ver `.env.example`):

```
VITE_API_URL=http://localhost:8080          # api-gateway
VITE_KEYCLOAK_URL=http://localhost:8180
VITE_KEYCLOAK_REALM=hce-realm
VITE_KEYCLOAK_CLIENT_ID=hce-gateway
```

Usuarios de prueba (los del realm de Keycloak): `dr.garcia`/`medico123` (MEDICO),
`enf.lopez`/`enfermero123` (ENFERMERO), `admin.sistema`/`admin123` (ADMIN),
`paciente.torres`/`paciente123` (PACIENTE).

> **Nota**: si tambien tienes corriendo el frontend bancario, ambos usan el puerto 5173 de
> Vite por defecto — no los levantes a la vez, o pasale `--port` a uno de los dos.

## Estructura

```
src/
├── ClinicaApp.tsx        <- Provider + BrowserRouter + AppRouter
├── main.tsx
├── api/clinicaApi.ts       <- axios unico hacia el api-gateway, interceptor agrega el JWT
├── types/                    <- interfaces que espejan los DTOs del backend
├── helpers/                    <- jwt (incluye extraerUserId), format, errors, roles
├── styles/                       <- variables.css, global.css, motion.ts
├── store/                          <- store.ts + un slice por dominio (auth, ui, pacientes,
│                                       expedientes, citas, recetas, auditoria)
├── hooks/                           <- un hook por dominio
├── router/AppRouter.tsx              <- auth vs dashboard segun el status de useAuthStore
├── auth/                               <- LoginPage (password grant contra Keycloak)
├── layout/                              <- Navbar, Sidebar (oculta "Auditoria" si no eres
│                                            ADMIN), Toast, DashboardLayout
├── components/                           <- Modal y Badge, compartidos entre dominios
└── pacientes/ expedientes/ citas/ recetas/ auditoria/
    (cada uno: components/ + pages/ + index.ts)
```

## Diferencias frente al frontend bancario (mismo patron, distinto dominio)

- **`pacientes` tiene CRUD completo** (el backend expone PUT/DELETE, a diferencia de
  clientes-service en el banco): `PacienteFormModal` sirve tanto para crear como editar.
- **`profesionalId`** (que piden expedientes/citas/recetas) se auto-completa con el `sub` del
  JWT del usuario logueado — no hay un servicio de "profesionales" en el backend para elegirlo
  de una lista, y tiene sentido que sea el propio medico/enfermero de la sesion.
- **`auditoria`** es una pantalla de busqueda (por id de entidad o por servicio de origen) mas
  un formulario de registro manual, visible solo para el rol ADMIN — el backend nunca llama a
  `auditoria-service` automaticamente desde los demas servicios (lo confirme revisando el
  codigo), asi que la UI no finge que es un feed en vivo.
- `expedientes`, `citas` y `recetas` son *append-only* en el backend: no hay editar/borrar,
  solo agregar entradas nuevas o cambiar de estado via botones (citas: confirmar/cancelar/
  completar/no asistió; recetas: dispensar/anular).

## RBAC en la UI (cosmetico, la autoridad real la valida el api-gateway)

| Accion | Roles que ven el boton |
|---|---|
| Crear/editar/eliminar paciente | MEDICO, ENFERMERO, ADMIN |
| Agregar entrada al expediente | MEDICO, ADMIN |
| Agendar/cambiar estado de cita | MEDICO, ENFERMERO, ADMIN |
| Prescribir/cambiar estado de receta | MEDICO, ADMIN |
| Ver y usar "Auditoría" (sidebar + ruta) | ADMIN |

## Notas / limitaciones conocidas

- El JWT no se refresca solo: cuando expira, hay que volver a iniciar sesion.
- El RBAC de la tabla de arriba es solo para mostrar/ocultar botones; el backend en algunos
  casos es mas permisivo (p.ej. `/api/pacientes/**` esta abierto a cualquier autenticado,
  incluido el rol PACIENTE) — la UI es mas estricta por sentido comun, no porque el backend lo
  exija.
