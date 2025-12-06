-- ============================================================================
-- ConectaPro Guatemala - Esquema de Base de Datos PostgreSQL
-- Versión: 1.0
-- Descripción: Plataforma para conectar profesionales/técnicos con clientes
-- ============================================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- Para geolocalización

-- ============================================================================
-- TABLA: users
-- Descripción: Almacena información de todos los usuarios (clientes y profesionales)
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('cliente', 'profesional')),
    email_verificado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    foto_perfil_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tipo ON users(tipo);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================================================
-- TABLA: categorias
-- Descripción: Categorías de profesionales/técnicos
-- ============================================================================
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50), -- Nombre del icono (ej: "wrench", "gavel", "stethoscope")
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías iniciales
INSERT INTO categorias (nombre, descripcion, icono) VALUES
('Plomero', 'Instalación y reparación de sistemas de plomería', 'wrench'),
('Electricista', 'Instalación y mantenimiento eléctrico', 'zap'),
('Abogado', 'Servicios legales y asesoría jurídica', 'gavel'),
('Médico', 'Atención médica y consultas', 'stethoscope'),
('Arquitecto', 'Diseño y supervisión de construcciones', 'building'),
('Contador', 'Servicios contables y fiscales', 'calculator'),
('Mecánico', 'Reparación y mantenimiento de vehículos', 'car'),
('Carpintero', 'Trabajos en madera y mueblería', 'hammer'),
('Pintor', 'Pintura residencial y comercial', 'paintbrush'),
('Jardinero', 'Mantenimiento de jardines y áreas verdes', 'leaf');

-- ============================================================================
-- TABLA: profesionales
-- Descripción: Información específica de profesionales/técnicos
-- ============================================================================
CREATE TABLE profesionales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    categoria_id INTEGER NOT NULL REFERENCES categorias(id),
    descripcion TEXT,
    anos_experiencia INTEGER CHECK (anos_experiencia >= 0),
    certificaciones TEXT[], -- Array de certificaciones
    especialidades TEXT[], -- Array de especialidades
    
    -- Ubicación
    departamento VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    direccion_completa TEXT,
    latitud DECIMAL(10, 8),
    longitud DECIMAL(11, 8),
    radio_cobertura_km INTEGER DEFAULT 20, -- Radio de cobertura en kilómetros
    
    -- Información de contacto profesional
    telefono_profesional VARCHAR(20),
    whatsapp VARCHAR(20),
    email_profesional VARCHAR(255),
    sitio_web VARCHAR(255),
    
    -- Estado de suscripción
    suscripcion_activa BOOLEAN DEFAULT FALSE,
    fecha_inicio_suscripcion TIMESTAMP WITH TIME ZONE,
    fecha_fin_suscripcion TIMESTAMP WITH TIME ZONE,
    
    -- Estadísticas
    calificacion_promedio DECIMAL(3, 2) DEFAULT 0.00 CHECK (calificacion_promedio >= 0 AND calificacion_promedio <= 5),
    total_resenas INTEGER DEFAULT 0,
    total_contactos INTEGER DEFAULT 0,
    
    -- Verificación
    verificado BOOLEAN DEFAULT FALSE,
    documento_verificacion_url TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_user_profesional UNIQUE (user_id)
);

-- Índices para profesionales
CREATE INDEX idx_profesionales_user_id ON profesionales(user_id);
CREATE INDEX idx_profesionales_categoria ON profesionales(categoria_id);
CREATE INDEX idx_profesionales_departamento ON profesionales(departamento);
CREATE INDEX idx_profesionales_municipio ON profesionales(municipio);
CREATE INDEX idx_profesionales_suscripcion_activa ON profesionales(suscripcion_activa);
CREATE INDEX idx_profesionales_calificacion ON profesionales(calificacion_promedio DESC);

-- Índice espacial para búsquedas por proximidad
CREATE INDEX idx_profesionales_location ON profesionales USING GIST (
    ST_MakePoint(longitud, latitud)::geography
);

-- ============================================================================
-- TABLA: resenas
-- Descripción: Reseñas y calificaciones de profesionales
-- ============================================================================
CREATE TABLE resenas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
    cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    editado BOOLEAN DEFAULT FALSE,
    ultima_edicion TIMESTAMP WITH TIME ZONE,
    
    -- Evitar múltiples reseñas del mismo cliente al mismo profesional
    CONSTRAINT unique_cliente_profesional_resena UNIQUE (cliente_id, profesional_id)
);

-- Índices para resenas
CREATE INDEX idx_resenas_profesional ON resenas(profesional_id);
CREATE INDEX idx_resenas_cliente ON resenas(cliente_id);
CREATE INDEX idx_resenas_fecha ON resenas(fecha DESC);
CREATE INDEX idx_resenas_calificacion ON resenas(calificacion);

-- ============================================================================
-- TABLA: suscripciones
-- Descripción: Historial de suscripciones de profesionales
-- ============================================================================
CREATE TABLE suscripciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('activa', 'cancelada', 'expirada', 'pendiente')),
    
    -- Información de pago
    metodo_pago VARCHAR(50) NOT NULL, -- 'neonet_tarjeta', 'neonet_transferencia', 'efectivo'
    monto DECIMAL(10, 2) NOT NULL,
    moneda VARCHAR(3) DEFAULT 'GTQ',
    neonet_transaction_id VARCHAR(255), -- ID de transacción de NeoNet
    neonet_authorization_code VARCHAR(255), -- Código de autorización
    neonet_payment_reference VARCHAR(255), -- Referencia de pago
    
    -- Renovación automática
    auto_renovacion BOOLEAN DEFAULT TRUE,
    
    -- Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelado_at TIMESTAMP WITH TIME ZONE,
    razon_cancelacion TEXT
);

-- Índices para suscripciones
CREATE INDEX idx_suscripciones_profesional ON suscripciones(profesional_id);
CREATE INDEX idx_suscripciones_estado ON suscripciones(estado);
CREATE INDEX idx_suscripciones_fechas ON suscripciones(fecha_inicio, fecha_fin);

-- ============================================================================
-- TABLA: mensajes
-- Descripción: Sistema de mensajería interna entre usuarios
-- ============================================================================
CREATE TABLE mensajes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    remitente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    destinatario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha_lectura TIMESTAMP WITH TIME ZONE,
    fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Para hilos de conversación
    conversacion_id UUID,
    
    -- Archivos adjuntos
    archivos_urls TEXT[]
);

-- Índices para mensajes
CREATE INDEX idx_mensajes_remitente ON mensajes(remitente_id);
CREATE INDEX idx_mensajes_destinatario ON mensajes(destinatario_id);
CREATE INDEX idx_mensajes_leido ON mensajes(leido);
CREATE INDEX idx_mensajes_conversacion ON mensajes(conversacion_id);
CREATE INDEX idx_mensajes_fecha ON mensajes(fecha_envio DESC);

-- ============================================================================
-- TABLA: contactos
-- Descripción: Registro de contactos entre clientes y profesionales
-- ============================================================================
CREATE TABLE contactos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
    tipo_contacto VARCHAR(20) NOT NULL CHECK (tipo_contacto IN ('llamada', 'whatsapp', 'mensaje', 'email')),
    fecha TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notas TEXT
);

-- Índices para contactos
CREATE INDEX idx_contactos_cliente ON contactos(cliente_id);
CREATE INDEX idx_contactos_profesional ON contactos(profesional_id);
CREATE INDEX idx_contactos_fecha ON contactos(fecha DESC);

-- ============================================================================
-- TABLA: favoritos
-- Descripción: Profesionales marcados como favoritos por clientes
-- ============================================================================
CREATE TABLE favoritos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_cliente_profesional_favorito UNIQUE (cliente_id, profesional_id)
);

-- Índices para favoritos
CREATE INDEX idx_favoritos_cliente ON favoritos(cliente_id);
CREATE INDEX idx_favoritos_profesional ON favoritos(profesional_id);

-- ============================================================================
-- TABLA: reportes
-- Descripción: Reportes de usuarios o profesionales problemáticos
-- ============================================================================
CREATE TABLE reportes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reportante_id UUID NOT NULL REFERENCES users(id),
    reportado_id UUID NOT NULL REFERENCES users(id),
    tipo_reporte VARCHAR(50) NOT NULL CHECK (tipo_reporte IN ('spam', 'fraude', 'contenido_inapropiado', 'suplantacion', 'otro')),
    descripcion TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_revision', 'resuelto', 'rechazado')),
    fecha_reporte TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP WITH TIME ZONE,
    resolucion TEXT
);

-- Índices para reportes
CREATE INDEX idx_reportes_reportante ON reportes(reportante_id);
CREATE INDEX idx_reportes_reportado ON reportes(reportado_id);
CREATE INDEX idx_reportes_estado ON reportes(estado);
CREATE INDEX idx_reportes_fecha ON reportes(fecha_reporte DESC);

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profesionales_updated_at BEFORE UPDATE ON profesionales
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suscripciones_updated_at BEFORE UPDATE ON suscripciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para actualizar calificación promedio de profesionales
CREATE OR REPLACE FUNCTION actualizar_calificacion_profesional()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profesionales
    SET 
        calificacion_promedio = (
            SELECT COALESCE(AVG(calificacion), 0)
            FROM resenas
            WHERE profesional_id = NEW.profesional_id
        ),
        total_resenas = (
            SELECT COUNT(*)
            FROM resenas
            WHERE profesional_id = NEW.profesional_id
        )
    WHERE id = NEW.profesional_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar calificación al insertar o actualizar reseña
CREATE TRIGGER trigger_actualizar_calificacion_insert
    AFTER INSERT ON resenas
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_calificacion_profesional();

CREATE TRIGGER trigger_actualizar_calificacion_update
    AFTER UPDATE ON resenas
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_calificacion_profesional();

-- Función para actualizar estado de suscripción
CREATE OR REPLACE FUNCTION actualizar_estado_suscripcion()
RETURNS TRIGGER AS $$
BEGIN
    -- Si la suscripción está activa y dentro del período
    IF NEW.estado = 'activa' AND 
       NEW.fecha_inicio <= CURRENT_TIMESTAMP AND 
       NEW.fecha_fin >= CURRENT_TIMESTAMP THEN
        
        UPDATE profesionales
        SET 
            suscripcion_activa = TRUE,
            fecha_inicio_suscripcion = NEW.fecha_inicio,
            fecha_fin_suscripcion = NEW.fecha_fin
        WHERE id = NEW.profesional_id;
    
    -- Si la suscripción expiró o se canceló
    ELSIF NEW.estado IN ('expirada', 'cancelada') OR
          NEW.fecha_fin < CURRENT_TIMESTAMP THEN
        
        UPDATE profesionales
        SET suscripcion_activa = FALSE
        WHERE id = NEW.profesional_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar estado de suscripción
CREATE TRIGGER trigger_actualizar_estado_suscripcion
    AFTER INSERT OR UPDATE ON suscripciones
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_estado_suscripcion();

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista de profesionales con información completa
CREATE OR REPLACE VIEW vista_profesionales_completa AS
SELECT 
    p.id,
    u.nombre,
    u.apellido,
    u.email,
    u.telefono,
    u.foto_perfil_url,
    p.descripcion,
    c.nombre AS categoria,
    p.anos_experiencia,
    p.certificaciones,
    p.especialidades,
    p.departamento,
    p.municipio,
    p.direccion_completa,
    p.latitud,
    p.longitud,
    p.telefono_profesional,
    p.whatsapp,
    p.email_profesional,
    p.sitio_web,
    p.suscripcion_activa,
    p.calificacion_promedio,
    p.total_resenas,
    p.verificado,
    p.created_at
FROM profesionales p
JOIN users u ON p.user_id = u.id
JOIN categorias c ON p.categoria_id = c.id
WHERE u.activo = TRUE;

-- Vista de estadísticas de profesionales
CREATE OR REPLACE VIEW estadisticas_profesionales AS
SELECT 
    c.nombre AS categoria,
    COUNT(p.id) AS total_profesionales,
    COUNT(CASE WHEN p.suscripcion_activa THEN 1 END) AS con_suscripcion_activa,
    AVG(p.calificacion_promedio) AS calificacion_promedio_categoria,
    SUM(p.total_resenas) AS total_resenas_categoria
FROM categorias c
LEFT JOIN profesionales p ON c.id = p.categoria_id
GROUP BY c.id, c.nombre
ORDER BY total_profesionales DESC;

-- ============================================================================
-- DATOS DE PRUEBA (Opcional - Comentar en producción)
-- ============================================================================

-- Usuario de prueba - Cliente
INSERT INTO users (email, password_hash, nombre, apellido, telefono, tipo, email_verificado)
VALUES ('cliente@test.com', '$2b$10$abcdefghijklmnopqrstuv', 'María', 'López', '55551234', 'cliente', TRUE);

-- Usuario de prueba - Profesional
INSERT INTO users (email, password_hash, nombre, apellido, telefono, tipo, email_verificado)
VALUES ('profesional@test.com', '$2b$10$abcdefghijklmnopqrstuv', 'Juan', 'Pérez', '55555678', 'profesional', TRUE);

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
