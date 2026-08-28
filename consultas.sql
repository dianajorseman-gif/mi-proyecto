-- 1. Crear la tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio NUMERIC(10,2) NOT NULL,
    stock INT NOT NULL,
    fecha_ingreso DATE DEFAULT CURRENT_DATE
);

-- 2. Insertar datos (INSERT) desde el formulario
INSERT INTO productos (nombre, categoria, precio, stock, fecha_ingreso)
VALUES ('Cuaderno A4', 'Papelería', 3.50, 50, '2026-08-28');

-- 3. Consultas y filtros (SELECT)
-- Buscar por ID
SELECT * FROM productos WHERE id = 1;

-- Filtrar por Categoría
SELECT * FROM productos WHERE categoria = 'Papelería';