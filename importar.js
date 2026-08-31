const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const sqlite3 = require('sqlite3').verbose();

const excelPath = path.join(__dirname, 'data', 'datos.xlsx');
const dbPath = path.join(__dirname, 'database', 'actividades.db');

if (!fs.existsSync(excelPath)) {
    console.error('No se encontró el archivo datos.xlsx en la carpeta "data"');
    process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Importar Hoja 1: Horario (si existe)
    if (workbook.SheetNames.includes('Horario')) {
        const datosHorario = XLSX.utils.sheet_to_json(workbook.Sheets['Horario']);
        const stmt = db.prepare('INSERT INTO horario (fecha, hora_inicio, hora_fin, actividad) VALUES (?, ?, ?, ?)');
        datosHorario.forEach(r => stmt.run(r.Fecha, r.Hora_Inicio, r.Hora_Fin, r.Actividad));
        stmt.finalize();
        console.log(`✓ Se importaron ${datosHorario.length} registros en Horario.`);
    }

    // Importar Hoja 2: Todo (si existe)
    if (workbook.SheetNames.includes('Todo')) {
        const datosTodo = XLSX.utils.sheet_to_json(workbook.Sheets['Todo']);
        const stmt = db.prepare('INSERT INTO todo (tarea, estado) VALUES (?, ?)');
        datosTodo.forEach(r => stmt.run(r.Tarea, r.Estado || 'Pendiente'));
        stmt.finalize();
        console.log(`✓ Se importaron ${datosTodo.length} tareas en To-Do.`);
    }

    // Importar Hoja 3: Habitos (si existe)
    if (workbook.SheetNames.includes('Habitos')) {
        const datosHabitos = XLSX.utils.sheet_to_json(workbook.Sheets['Habitos']);
        const stmt = db.prepare('INSERT INTO habitos (habito, frecuencia) VALUES (?, ?)');
        datosHabitos.forEach(r => stmt.run(r.Habito, r.Frecuencia));
        stmt.finalize();
        console.log(`✓ Se importaron ${datosHabitos.length} hábitos.`);
    }
});

db.close();