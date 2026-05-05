const pool = require('./db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const email = 'alessamercadohernandez@gmail.com';
    const password = 'admin123';
    const nombre = 'Alessa';
    const apellidos = 'Mercado Hernandez';
    const edad = 20; // Valor por defecto

    try {
        console.log(`Buscando usuario: ${email}...`);
        
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (userExists.rows.length > 0) {
            console.log('El usuario ya existe. Actualizando a rol ADMIN y reseteando contraseña...');
            await pool.query(
                'UPDATE usuarios SET password = $1, rol = $2, nombre = $3, apellidos = $4 WHERE email = $5',
                [hashedPassword, 'admin', nombre, apellidos, email]
            );
            console.log('✅ Usuario actualizado con éxito.');
        } else {
            console.log('El usuario no existe. Creando nuevo usuario ADMIN...');
            await pool.query(
                'INSERT INTO usuarios (nombre, apellidos, edad, email, password, rol) VALUES ($1, $2, $3, $4, $5, $6)',
                [nombre, apellidos, edad, email, hashedPassword, 'admin']
            );
            console.log('✅ Usuario administrador creado con éxito.');
        }
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Error al crear/actualizar el admin:', err);
        process.exit(1);
    }
}

createAdmin();
