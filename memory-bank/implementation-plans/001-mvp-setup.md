# Plan de Implementación Técnica - MVP Gestorcitas

Este documento detalla los pasos de desarrollo para construir el MVP de la plataforma de reservas multi-inquilino.

## 🛠️ Stack Tecnológico Sugerido
* **Backend:** Node.js (Express o NestJS) o Python (FastAPI) dentro de la carpeta `/backend`.
* **Frontend:** React, Vue o Next.js dentro de la carpeta `/frontend` (diseño Mobile-First).
* **Base de Datos:** Relacional (PostgreSQL) para manejar de forma robusta las relaciones multi-inquilino.

---

## 📅 Fase 1: Configuración de Base de Datos y Backend (`/backend`)

### Paso 1.1: Modelo de Datos Mínimo (Esquema SQL)
Diseñar las tablas esenciales garantizando el aislamiento de datos por empresa (*multi-tenancy*):
* `companies`: ID, name, slug (para la URL única), email, business_hours (JSON).
* `services`: ID, company_id (FK), name, duration_minutes, price.
* `bookings`: ID, company_id (FK), service_id (FK), client_name, client_phone, client_email, start_time, end_time, status (confirmed/cancelled), cancellation_token.

### Paso 1.2: Endpoints de la API Esenciales
* **POST** `/api/companies`: Registro inicial de comercios.
* **GET/POST** `/api/companies/:slug/services`: Obtener catálogo público y gestionar servicios de una empresa.
* **GET** `/api/companies/:slug/availability`: Consultar huecos libres calculando cruces de horarios.
* **POST** `/api/bookings`: Crear una reserva (Genera `cancellation_token` y dispara email).
* **POST** `/api/bookings/cancel/:token`: Cancelar reserva sin autenticación mediante el token seguro.

---

## 🎨 Fase 2: Desarrollo de la Interfaz (`/frontend`)

### Paso 2.1: Panel Privado de la Empresa (Dashboard B2B)
* Formulario de configuración de horarios y alta de servicios con precio y duración.
* Vista de calendario simple (bloques de tiempo) que consuma el endpoint de reservas.

### Paso 2.2: Vista Pública del Cliente Final (Flujo B2C Mobile-First)
* **Pantalla 1 (Catálogo):** Accesible desde `plataforma.com`. Muestra la lista de servicios y precios.
* **Pantalla 2 (Calendario):** Selector visual de fecha y horas disponibles en formato de cuadrícula simple.
* **Pantalla 3 (Formulario Express):** Tres campos básicos (Nombre, Teléfono, Email) y botón "Confirmar Reserva".
* **Pantalla 4 (Cancelación):** Landing page simple de confirmación al pulsar el link del correo, con botón destacado para "Volver a reservar".

---

## 🔒 Mecanismos Críticos del MVP
1. **Prevención de Double-Booking:** El backend debe validar la disponibilidad del hueco en una transacción única de base de datos antes de confirmar el registro de la cita.
2. **Seguridad por Token:** El enlace de cancelación enviado por correo debe contener un UUID complejo (`cancellation_token`) para que el usuario pueda dar de baja la cita de forma segura sin tener que iniciar sesión.