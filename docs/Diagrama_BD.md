# Diagrama Entidad-Relación - ConectaPro Guatemala

Este archivo contiene el diagrama del modelo de datos en formato Mermaid.
Puede ser visualizado en GitHub, herramientas compatibles con Mermaid, o exportado como imagen.

## Diagrama ER Completo

```mermaid
erDiagram
    users ||--o| profesionales : "puede_ser"
    users ||--o{ resenas : "escribe_como_cliente"
    users ||--o{ mensajes : "envia"
    users ||--o{ mensajes : "recibe"
    users ||--o{ contactos : "realiza"
    users ||--o{ favoritos : "marca"
    users ||--o{ reportes : "reporta"
    users ||--o{ reportes : "es_reportado"
    
    categorias ||--o{ profesionales : "pertenece_a"
    
    profesionales ||--o{ resenas : "recibe"
    profesionales ||--o{ suscripciones : "tiene"
    profesionales ||--o{ contactos : "es_contactado"
    profesionales ||--o{ favoritos : "es_favorito"
    
    users {
        uuid id PK
        varchar email UK
        varchar password_hash
        varchar nombre
        varchar apellido
        varchar telefono
        varchar tipo "cliente|profesional"
        boolean email_verificado
        boolean activo
        text foto_perfil_url
        timestamp created_at
        timestamp updated_at
    }
    
    categorias {
        serial id PK
        varchar nombre UK
        text descripcion
        varchar icono
        boolean activo
        timestamp created_at
    }
    
    profesionales {
        uuid id PK
        uuid user_id FK
        int categoria_id FK
        text descripcion
        int anos_experiencia
        text[] certificaciones
        text[] especialidades
        varchar departamento
        varchar municipio
        text direccion_completa
        decimal latitud
        decimal longitud
        int radio_cobertura_km
        varchar telefono_profesional
        varchar whatsapp
        varchar email_profesional
        varchar sitio_web
        boolean suscripcion_activa
        timestamp fecha_inicio_suscripcion
        timestamp fecha_fin_suscripcion
        decimal calificacion_promedio
        int total_resenas
        int total_contactos
        boolean verificado
        text documento_verificacion_url
        timestamp created_at
        timestamp updated_at
    }
    
    resenas {
        uuid id PK
        uuid profesional_id FK
        uuid cliente_id FK
        int calificacion "1-5"
        text comentario
        timestamp fecha
        boolean editado
        timestamp ultima_edicion
    }
    
    suscripciones {
        uuid id PK
        uuid profesional_id FK
        timestamp fecha_inicio
        timestamp fecha_fin
        varchar estado "activa|cancelada|expirada|pendiente"
        varchar metodo_pago
        decimal monto
        varchar moneda
        varchar neonet_transaction_id
        varchar neonet_authorization_code
        boolean auto_renovacion
        timestamp created_at
        timestamp updated_at
        timestamp cancelado_at
        text razon_cancelacion
    }
    
    mensajes {
        uuid id PK
        uuid remitente_id FK
        uuid destinatario_id FK
        text contenido
        boolean leido
        timestamp fecha_lectura
        timestamp fecha_envio
        uuid conversacion_id
        text[] archivos_urls
    }
    
    contactos {
        uuid id PK
        uuid cliente_id FK
        uuid profesional_id FK
        varchar tipo_contacto "llamada|whatsapp|mensaje|email"
        timestamp fecha
        text notas
    }
    
    favoritos {
        uuid id PK
        uuid cliente_id FK
        uuid profesional_id FK
        timestamp fecha_agregado
    }
    
    reportes {
        uuid id PK
        uuid reportante_id FK
        uuid reportado_id FK
        varchar tipo_reporte
        text descripcion
        varchar estado "pendiente|en_revision|resuelto|rechazado"
        timestamp fecha_reporte
        timestamp fecha_resolucion
        text resolucion
    }
```

## Diagrama Simplificado (Relaciones Principales)

```mermaid
erDiagram
    users ||--o| profesionales : "es"
    categorias ||--o{ profesionales : "tiene"
    profesionales ||--o{ resenas : "recibe"
    users ||--o{ resenas : "escribe"
    profesionales ||--o{ suscripciones : "paga"
    
    users {
        uuid id
        string email
        string nombre
        string tipo
    }
    
    profesionales {
        uuid id
        uuid user_id
        int categoria_id
        string departamento
        string municipio
        decimal calificacion_promedio
        boolean suscripcion_activa
    }
    
    categorias {
        int id
        string nombre
        string icono
    }
    
    resenas {
        uuid id
        uuid profesional_id
        uuid cliente_id
        int calificacion
        text comentario
    }
    
    suscripciones {
        uuid id
        uuid profesional_id
        string estado
        decimal monto
    }
```

## Diagrama de Flujo de Usuario

```mermaid
graph TD
    A[Usuario Nuevo] --> B{¿Qué tipo de usuario?}
    B -->|Cliente| C[Registro como Cliente]
    B -->|Profesional| D[Registro como Profesional]
    
    C --> E[Buscar Profesionales]
    E --> F[Ver Perfiles]
    F --> G{¿Quiere contactar?}
    G -->|Sí| H[Contactar Profesional]
    G -->|No| E
    H --> I[Dejar Reseña]
    
    D --> J[Crear Perfil Profesional]
    J --> K{¿Activar Suscripción?}
    K -->|Sí| L[Pagar Suscripción Q99/mes]
    K -->|No| M[Perfil Inactivo]
    L --> N[Perfil Activo y Visible]
    N --> O[Recibir Contactos]
    O --> P[Recibir Reseñas]
    
    style C fill:#90EE90
    style D fill:#87CEEB
    style L fill:#FFD700
    style N fill:#98FB98
```

## Arquitectura de Datos por Capa

```mermaid
graph TB
    subgraph "Capa de Presentación"
        A[Next.js Frontend]
    end
    
    subgraph "Capa de API"
        B[Express.js REST API]
        C[JWT Authentication]
        D[Validación de Datos]
    end
    
    subgraph "Capa de Datos"
        E[PostgreSQL Principal]
        F[Redis Caché]
        G[Cloudinary Storage]
    end
    
    subgraph "Servicios Externos"
        H[NeoNet Payments]
        I[SendGrid Email]
        J[Google Maps API]
    end
    
    A --> B
    B --> C
    B --> D
    D --> E
    B --> F
    B --> G
    B --> H
    B --> I
    B --> J
    
    style A fill:#61DAFB
    style E fill:#336791
    style F fill:#DC382D
    style H fill:#008CDD
```

## Ciclo de Vida de una Suscripción

```mermaid
stateDiagram-v2
    [*] --> Pendiente: Profesional inicia suscripción
    Pendiente --> Activa: Pago confirmado
    Pendiente --> Cancelada: Pago rechazado
    
    Activa --> Activa: Renovación automática exitosa
    Activa --> Expirada: Fin de período sin renovación
    Activa --> Cancelada: Usuario cancela
    
    Expirada --> Activa: Renovación manual
    Expirada --> [*]: Sin acción
    
    Cancelada --> [*]
    
    note right of Activa
        Perfil visible en búsquedas
        Puede recibir contactos
    end note
    
    note right of Expirada
        Perfil oculto
        Datos conservados
    end note
```

## Proceso de Búsqueda Geolocalizada

```mermaid
sequenceDiagram
    participant U as Usuario/Cliente
    participant F as Frontend
    participant A as API
    participant DB as PostgreSQL
    participant G as Google Maps
    
    U->>F: Ingresa búsqueda
    F->>G: Obtiene coordenadas de ubicación
    G-->>F: Retorna latitud/longitud
    F->>A: GET /profesionales/buscar?categoria=X&lat=Y&lng=Z
    A->>DB: Query con PostGIS ST_Distance
    DB-->>A: Lista de profesionales ordenados por distancia
    A->>A: Filtra solo con suscripción activa
    A-->>F: JSON con resultados
    F->>G: Marca profesionales en mapa
    F-->>U: Muestra resultados
    
    U->>F: Selecciona profesional
    F->>A: GET /profesionales/:id
    A->>DB: Query perfil completo + reseñas
    DB-->>A: Datos del profesional
    A-->>F: JSON con perfil completo
    F-->>U: Muestra perfil detallado
```

