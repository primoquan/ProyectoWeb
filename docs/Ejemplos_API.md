# Ejemplos de Respuestas JSON - API ConectaPro Guatemala

Este documento contiene ejemplos de las respuestas JSON de los principales endpoints de la API. 

---

## Endpoint 1: Buscar Profesionales

**GET** `/api/v1/profesionales/buscar?categoria=1&departamento=Guatemala&municipio=Mixco&limite=20`

### Respuesta Exitosa (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nombre": "Juan",
      "apellido": "Pérez",
      "categoria": "Plomero",
      "anos_experiencia": 8,
      "departamento": "Guatemala",
      "municipio": "Mixco",
      "calificacion_promedio": 4.7,
      "total_resenas": 23,
      "foto_perfil_url": "https://res.cloudinary.com/conectapro/image/upload/v1/profesionales/juan-perez.jpg",
      "suscripcion_activa": true,
      "especialidades": ["Instalación de tuberías", "Reparación de fugas", "Sistemas de agua caliente"],
      "telefono_profesional": "+502 5551-2345",
      "whatsapp": "+502 5551-2345",
      "verificado": true
    },
    {
      "id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "nombre": "Carlos",
      "apellido": "Ramírez",
      "categoria": "Plomero",
      "anos_experiencia": 5,
      "departamento": "Guatemala",
      "municipio": "Mixco",
      "calificacion_promedio": 4.5,
      "total_resenas": 15,
      "foto_perfil_url": "https://res.cloudinary.com/conectapro/image/upload/v1/profesionales/carlos-ramirez.jpg",
      "suscripcion_activa": true,
      "especialidades": ["Drenajes", "Instalaciones residenciales"],
      "telefono_profesional": "+502 5552-6789",
      "whatsapp": "+502 5552-6789",
      "verificado": true
    }
  ],
  "total": 2,
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_pages": 1
  }
}
```

### Respuesta con Filtros Sin Resultados (200 OK):

```json
{
  "success": true,
  "data": [],
  "total": 0,
  "message": "No se encontraron profesionales con los criterios especificados",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_pages": 0
  }
}
```

### Error de Validación (400 Bad Request):

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Parámetros de búsqueda inválidos",
    "details": {
      "categoria": "El ID de categoría debe ser un número válido"
    }
  }
}
```

---

## Endpoint 2: Crear Reseña

**POST** `/api/v1/resenas`

### Cuerpo de la Petición:

```json
{
  "profesional_id": "550e8400-e29b-41d4-a716-446655440000",
  "calificacion": 5,
  "comentario": "Excelente trabajo, muy profesional y rápido. Resolvió la fuga de agua en mi casa en menos de una hora. Altamente recomendado."
}
```

### Respuesta Exitosa (201 Created):

```json
{
  "success": true,
  "message": "Reseña creada exitosamente",
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "profesional_id": "550e8400-e29b-41d4-a716-446655440000",
    "cliente_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "cliente_nombre": "María López",
    "calificacion": 5,
    "comentario": "Excelente trabajo, muy profesional y rápido. Resolvió la fuga de agua en mi casa en menos de una hora. Altamente recomendado.",
    "fecha": "2024-12-05T14:30:00Z",
    "editado": false
  }
}
```

### Error - Usuario Ya Dejó Reseña (409 Conflict):

```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_REVIEW",
    "message": "Ya has dejado una reseña para este profesional",
    "details": {
      "existing_review_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7"
    }
  }
}
```

### Error - No Autenticado (401 Unauthorized):

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token de autenticación requerido",
    "details": "Debes iniciar sesión para crear una reseña"
  }
}
```

---

## Endpoint 3: Obtener Perfil de Profesional

**GET** `/api/v1/profesionales/550e8400-e29b-41d4-a716-446655440000`

### Respuesta Exitosa (200 OK):

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email_profesional": "juan.perez.plomero@gmail.com",
    "telefono": "+502 5555-1234",
    "telefono_profesional": "+502 5551-2345",
    "whatsapp": "+502 5551-2345",
    "categoria": "Plomero",
    "descripcion": "Plomero profesional con más de 8 años de experiencia en instalaciones residenciales y comerciales. Especialista en sistemas de agua caliente, reparación de fugas y drenajes. Atención rápida y trabajo garantizado.",
    "anos_experiencia": 8,
    "certificaciones": [
      "Instalador Certificado - Asociación de Plomeros de Guatemala",
      "Curso de Plomería Residencial - INTECAP",
      "Manejo de Sistemas de Agua Caliente"
    ],
    "especialidades": [
      "Instalación de tuberías",
      "Reparación de fugas",
      "Sistemas de agua caliente",
      "Drenajes",
      "Instalaciones sanitarias"
    ],
    "departamento": "Guatemala",
    "municipio": "Mixco",
    "direccion_completa": "Zona 6 de Mixco, Guatemala",
    "radio_cobertura_km": 25,
    "calificacion_promedio": 4.7,
    "total_resenas": 23,
    "total_contactos": 187,
    "foto_perfil_url": "https://res.cloudinary.com/conectapro/image/upload/v1/profesionales/juan-perez.jpg",
    "verificado": true,
    "suscripcion_activa": true,
    "fecha_inicio_suscripcion": "2024-11-01T00:00:00Z",
    "fecha_fin_suscripcion": "2024-12-01T00:00:00Z",
    "sitio_web": "https://www.plomeriajuanperez.com",
    "horario_atencion": "Lunes a Sábado: 7:00 AM - 6:00 PM",
    "resenas_recientes": [
      {
        "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
        "cliente_nombre": "María López",
        "calificacion": 5,
        "comentario": "Muy profesional y rápido. Excelente servicio.",
        "fecha": "2024-12-01T10:30:00Z"
      },
      {
        "id": "8d1feb88-8536-51ef-a845-f18fd2e18be8",
        "cliente_nombre": "Roberto García",
        "calificacion": 5,
        "comentario": "Solucionó el problema de fuga que tenía. Recomendado 100%.",
        "fecha": "2024-11-28T15:45:00Z"
      },
      {
        "id": "9e2fdc99-9647-62fg-b956-g29ge3f29cf9",
        "cliente_nombre": "Ana Martínez",
        "calificacion": 4,
        "comentario": "Buen trabajo, llegó puntual y resolvió rápido.",
        "fecha": "2024-11-25T09:15:00Z"
      }
    ],
    "estadisticas": {
      "calificacion_5_estrellas": 18,
      "calificacion_4_estrellas": 4,
      "calificacion_3_estrellas": 1,
      "calificacion_2_estrellas": 0,
      "calificacion_1_estrella": 0,
      "tiempo_promedio_respuesta_horas": 2.5
    }
  }
}
```

### Error - Profesional No Encontrado (404 Not Found):

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Profesional no encontrado",
    "details": "No existe un profesional con el ID especificado"
  }
}
```

### Error - Profesional Inactivo (403 Forbidden):

```json
{
  "success": false,
  "error": {
    "code": "PROFESSIONAL_INACTIVE",
    "message": "El perfil de este profesional no está activo",
    "details": "Este profesional ha desactivado temporalmente su perfil o su suscripción ha expirado"
  }
}
```

---

## Endpoint Adicional: Login de Usuario

**POST** `/api/v1/auth/login`

### Cuerpo de la Petición:

```json
{
  "email": "cliente@example.com",
  "password": "MiPassword123!"
}
```

### Respuesta Exitosa (200 OK):

```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "user": {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "email": "cliente@example.com",
      "nombre": "María",
      "apellido": "López",
      "tipo": "cliente",
      "foto_perfil_url": "https://res.cloudinary.com/conectapro/image/upload/v1/users/maria-lopez.jpg"
    },
    "tokens": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expires_in": 604800
    }
  }
}
```

### Error - Credenciales Inválidas (401 Unauthorized):

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email o contraseña incorrectos",
    "details": "Verifica tus credenciales e intenta nuevamente"
  }
}
```

---

## Endpoint Adicional: Registro de Profesional

**POST** `/api/v1/auth/register`

### Cuerpo de la Petición:

```json
{
  "email": "nuevo.profesional@example.com",
  "password": "Password123!",
  "password_confirm": "Password123!",
  "nombre": "Pedro",
  "apellido": "Gómez",
  "telefono": "+502 5553-9876",
  "tipo": "profesional",
  "profesional_data": {
    "categoria_id": 2,
    "descripcion": "Electricista certificado con 10 años de experiencia",
    "anos_experiencia": 10,
    "departamento": "Guatemala",
    "municipio": "Villa Nueva",
    "telefono_profesional": "+502 5553-9876",
    "whatsapp": "+502 5553-9876"
  }
}
```

### Respuesta Exitosa (201 Created):

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "email": "nuevo.profesional@example.com",
      "nombre": "Pedro",
      "apellido": "Gómez",
      "tipo": "profesional",
      "email_verificado": false
    },
    "message_verification": "Se ha enviado un correo de verificación a tu email"
  }
}
```

