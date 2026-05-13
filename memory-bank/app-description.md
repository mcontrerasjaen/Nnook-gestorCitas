# Descripción de la Aplicación (NNOOK-GESTORCITAS)

## 🎯 Objetivo del Proyecto y Enfoque del MVP
* **Modelo de Negocio:** SaaS Multi-Inquilino de Gestión de Reservas B2B2C.
* **Cliente Directo (B):** Empresas y comercios independientes que gestionan citas.
* **Usuario Final (C):** Clientes de dichas empresas que reservan de forma autónoma.
* **Sector Piloto:** Servicios basados en tiempo fijo (ej. centros de estética, peluquerías, consultorías).
* **Estrategia de Fidelización:** Eliminación de barreras (reserva móvil instantánea sin necesidad de registro) y autogestión ágil de cancelaciones por email para evitar ausencias.

---

## 📋 Documento de Requisitos de MVP (PRD)

### 👥 Módulo Empresa (Cliente B)
* **RF-B01 (Catálogo de Servicios):** Interfaz simple para configurar servicios asignando obligatoriamente Nombre del Servicio, Duración en minutos y Precio.
* **RF-B02 (Gestión de Disponibilidad):** Definición de la agenda comercial del negocio (días laborables y franja horaria de atención).
* **RF-B03 (Panel de Control Visual):** Vista de calendario administrativo que muestra las citas ocupadas y destaca las citas canceladas.
* **RF-B04 (Generador de Enlace Único):** Generación automática de una URL parametrizada para cada comercio (ej. `plataforma.com`).

### 📱 Módulo Cliente Final (Usuario C)
* **RF-C01 (Menú Digital de Selección):** Interfaz web optimizada para móviles (Mobile-First) que muestra el listado de servicios de la empresa con sus respectivos precios.
* **RF-C02 (Reserva sin Fricción):** Calendario interactivo en tiempo real con los turnos libres. El usuario reserva rellenando solo Nombre, Teléfono y Correo Electrónico (sin contraseñas).
* **RF-C03 (Notificación con Enlace Dinámico):** Envío automático de un email de confirmación que incluye un token o botón único y seguro de cancelación.
* **RF-C04 (Autogestión de Cancelación):** Botón que, al pulsarse desde el correo, da de baja la reserva y libera el bloque horario de manera inmediata en la agenda.

### ⚙️ Requisitos No Funcionales y Reglas de Negocio
* **RNF-01 (Seguridad Multi-inquilino):** Aislamiento estricto de los datos en la base de datos por ID de empresa para garantizar la confidencialidad.
* **RNF-02 (Bloqueo de Concurrencia):** Reserva temporal automática del hueco horario mientras el usuario introduce sus datos de contacto para evitar el *double-booking*.
* **RN-01 (Recuperación de Cliente):** La pantalla de confirmación de cancelación incluye un acceso directo para "Agendar una nueva cita" con el fin de retener al usuario.