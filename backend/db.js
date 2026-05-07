const { Pool } = require('pg');
require('dotenv').config();

// Railway provee DATABASE_URL; en local usamos variables individuales
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } // Requerido por Railway
    })
    : new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });

// Prueba de conexión
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a PostgreSQL:', err.stack);
    } else {
        console.log('Conectado exitosamente a PostgreSQL 🐘');
    }
    if (release) release();
});

module.exports = pool;
