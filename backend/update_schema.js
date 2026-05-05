const pool = require('./db');

async function updateSchema() {
    try {
        await pool.query('ALTER TABLE libros ADD COLUMN IF NOT EXISTS cantidad INTEGER DEFAULT 0;');
        console.log('Columna "cantidad" agregada exitosamente ✅');
        process.exit(0);
    } catch (err) {
        console.error('Error actualizando el esquema:', err);
        process.exit(1);
    }
}

updateSchema();
