DROP TABLE IF EXISTS horario;
CREATE TABLE horario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    hora TEXT,
    actividad TEXT,
    tipo TEXT
);

DROP TABLE IF EXISTS todo;
CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    hora TEXT,
    actividad TEXT
);

DROP TABLE IF EXISTS habitos;
CREATE TABLE habitos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT,
    hora TEXT,
    tiempo TEXT,
    actividad TEXT
);