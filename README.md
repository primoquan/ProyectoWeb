# 🔧 ConectaPro Guatemala

> Plataforma digital que conecta profesionales y técnicos guatemaltecos con clientes que necesitan sus servicios de manera rápida, eficiente y geolocalizada.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [El Problema](#-el-problema)
- [La Solución](#-la-solución)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [Modelo de Datos](#-modelo-de-datos)
- [API Endpoints](#-api-endpoints)
- [Prototipo](#-prototipo)
- [Roadmap](#️-roadmap)
- [Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

**ConectaPro Guatemala** es una plataforma web que democratiza el acceso al mercado laboral digital para profesionales independientes y técnicos especializados en Guatemala, mientras facilita a los usuarios finales encontrar servicios confiables de manera inmediata.

### Características Principales

✅ **Registro Dual**: Profesionales crean perfiles completos con especialidades, experiencia y certificaciones  
✅ **Búsqueda Geolocalizada**: Encuentra profesionales por categoría y ubicación en Guatemala  
✅ **Sistema de Reseñas**: Calificaciones y comentarios verificados para generar confianza  
✅ **Contacto Directo**: Mensajería interna y visualización de datos de contacto  
✅ **Modelo Freemium**: Gratuito para clientes, suscripción accesible para profesionales (Q99/mes)  

---

## ❌ El Problema

En Guatemala existe una desconexión significativa entre profesionales capacitados y personas que necesitan sus servicios:

- 🔍 **Dificultad para encontrar profesionales confiables** en situaciones de emergencia
- 👷 **Falta de visibilidad** para profesionales independientes y técnicos especializados
- 📍 **Ausencia de plataforma centralizada** con búsqueda por ubicación geográfica
- 💼 **Pérdida de oportunidades laborales** por limitada presencia digital
- ⏱️ **Procesos de búsqueda ineficientes** que consumen tiempo y recursos

---

## ✅ La Solución

ConectaPro Guatemala conecta a profesionales y técnicos con clientes de manera eficiente mediante:

### Para Clientes (Usuarios Finales)
- Búsqueda rápida por categoría (plomero, abogado, doctor, etc.)
- Filtros por ubicación (departamento, municipio)
- Visualización de perfiles con calificaciones verificadas
- Contacto directo (teléfono, WhatsApp, mensajería interna)
- **100% gratuito**

### Para Profesionales y Técnicos
- Perfil profesional completo con portafolio
- Visibilidad en búsquedas geolocalizadas
- Sistema de reseñas para construir reputación
- Notificaciones de clientes interesados
- Suscripción mensual accesible (**Q99/mes**)

---

## 🛠 Tecnologías Utilizadas

### Frontend
```
- Next.js 14 (React Framework con SSR)
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Leaflet (Mapas)
```

### Backend
```
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- NeoNet API (Pagos)
```

### Base de Datos
```
- PostgreSQL 16
- PostGIS (Extensión geoespacial)
- Supabase (Hosting)
```

### DevOps y Hosting
```
- Vercel (Frontend)
- Railway/Render (Backend)
- Cloudinary (Imágenes)
- GitHub Actions (CI/CD)
```

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                    │
│  Next.js 14 + React + Tailwind CSS + Shadcn/UI              │
│  (Desplegado en Vercel)                                      │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE LÓGICA                          │
│  Node.js + Express.js + JWT Auth                            │
│  (Desplegado en Railway/Render)                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬──────────────┐
        │              │               │              │
        ▼              ▼               ▼              ▼
┌──────────────┐ ┌──────────┐  ┌────────────┐ ┌────────────┐
│  PostgreSQL  │ │  Redis   │  │   NeoNet   │ │ Cloudinary │
│  (Supabase)  │ │  (Caché) │  │  (Pagos)   │ │ (Imágenes) │
└──────────────┘ └──────────┘  └────────────┘ └────────────┘
```

### Justificación de Tecnologías

**¿Por qué Next.js?**
- Server-Side Rendering (SSR) crucial para SEO en un marketplace
- Excelente rendimiento y experiencia de usuario
- Deploy optimizado en Vercel (gratis para MVPs)

**¿Por qué PostgreSQL?**
- Datos con relaciones claras y estructuradas
- Integridad referencial para transacciones
- PostGIS para búsquedas geoespaciales nativas
- ACID compliance para consistencia en pagos

---

## 📊 Modelo de Datos

### Diagrama ER Simplificado

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│    users    │────1:1──│  profesionales   │────N:1──│ categorias  │
└─────────────┘         └──────────────────┘         └─────────────┘
      │                         │
      │                         │
      │                         │ 1:N
      │                         ▼
      │                  ┌─────────────┐
      │                  │   resenas   │
      │                  └─────────────┘
      │
      │ N:M
      ▼
┌─────────────┐
│  mensajes   │
└─────────────┘
```

### Tablas Principales

| Tabla | Descripción | Campos Clave |
|-------|-------------|--------------|
| **users** | Todos los usuarios (clientes y profesionales) | id, email, nombre, tipo |
| **profesionales** | Información de profesionales/técnicos | user_id, categoria_id, departamento, calificacion_promedio |
| **categorias** | Categorías profesionales | nombre, descripcion, icono |
| **resenas** | Calificaciones y comentarios | profesional_id, cliente_id, calificacion |
| **suscripciones** | Historial de pagos | profesional_id, fecha_inicio, estado |
| **mensajes** | Mensajería interna | remitente_id, destinatario_id, contenido |

📄 **Ver esquema completo**: [`schema.sql`]

---

## 🔌 API Endpoints

### Autenticación
```http
POST   /api/v1/auth/register          # Registro de usuario
POST   /api/v1/auth/login              # Inicio de sesión
POST   /api/v1/auth/refresh-token      # Renovar token JWT
POST   /api/v1/auth/logout             # Cerrar sesión
```

### Profesionales
```http
GET    /api/v1/profesionales/buscar    # Buscar profesionales (filtros: categoria, ubicación)
GET    /api/v1/profesionales/:id       # Obtener perfil de profesional
PUT    /api/v1/profesionales/:id       # Actualizar perfil (requiere auth)
POST   /api/v1/profesionales            # Crear perfil profesional
```

### Reseñas
```http
GET    /api/v1/resenas?profesional_id=:id  # Listar reseñas de un profesional
POST   /api/v1/resenas                     # Crear reseña (requiere auth)
PUT    /api/v1/resenas/:id                 # Editar reseña propia
DELETE /api/v1/resenas/:id                 # Eliminar reseña propia
```

### Mensajería
```http
GET    /api/v1/mensajes                # Obtener conversaciones
POST   /api/v1/mensajes                # Enviar mensaje
PATCH  /api/v1/mensajes/:id/leer      # Marcar como leído
```

### Suscripciones
```http
POST   /api/v1/suscripciones/crear           # Crear suscripción (NeoNet)
POST   /api/v1/suscripciones/cancelar        # Cancelar suscripción
GET    /api/v1/suscripciones/estado          # Estado actual
```

---

## 🎨 Prototipo

### Enlace al Prototipo v0
🔗 **[Ver Prototipo Interactivo en v0.dev](https://v0.app/chat/conecta-pro-landing-page-nV60H5rI4pO?b=b_fJWBvY8SVF3)** 

### Capturas de Pantalla

#### Página de Inicio
[Pagina de inicio](screenshots/01-landing-page_01.png)

#### Búsqueda de Profesionales
[Pagina de Busqueda](screenshots/02-busqueda.png)

#### Perfil de Profesional
[Perfil Profesional](screenshots/03-perfil_01.png)

---

## 🗓️ Roadmap

### Fase 1: MVP (Diciembre 2025) ✅
- [x] Diseño de arquitectura
- [x] Modelo de base de datos
- [x] Documentación técnica
- [ ] Prototipo funcional en v0.dev
- [ ] API básica (autenticación, búsqueda, reseñas)

### Fase 2: Beta Privada (Enero 2026)
- [ ] Frontend completo en Next.js
- [ ] Sistema de mensajería
- [ ] Integración de pagos (NeoNet)
- [ ] Testing con 10 profesionales
- [ ] Testing con 20 clientes

### Fase 3: Lanzamiento Público (Febrero 2026)
- [ ] Deploy en producción
- [ ] Panel administrativo
- [ ] Sistema de notificaciones (email/SMS)
- [ ] SEO y marketing digital
- [ ] Lanzamiento en zona metropolitana de Guatemala

### Fase 4: Expansión (Marzo-Junio 2026)
- [ ] App móvil (React Native)
- [ ] Expansión a departamentos
- [ ] Verificación avanzada de profesionales
- [ ] Integración con Google My Business
- [ ] Sistema de promociones y descuentos

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Equipo

Desarrollado como proyecto de innovación web.

- **Desarrollo**: Luis M. Quan

---

## 📞 Contacto

¿Preguntas o sugerencias? Contáctanos:

- 📧 Email: primoquan@gmail.com
- 💼 LinkedIn: [Luis Quan](https://www.linkedin.com/in/primoquan/)

---



<div align="center">
  <strong>Hecho con ❤️ en Guatemala 🇬🇹</strong>
</div>
