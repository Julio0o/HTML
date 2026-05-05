const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('./db');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../PAGINA-WEB/imagenes'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());
// Servir la carpeta de imágenes de forma estática
app.use('/imagenes', express.static(path.join(__dirname, '../PAGINA-WEB/imagenes')));

// === RUTAS DE AUTENTICACIÓN ===

// Verificar disponibilidad de email (AJAX)
app.get('/api/auth/check-email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const user = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        res.json({ available: user.rows.length === 0 });
    } catch (err) {
        res.status(500).json({ error: 'Error al verificar disponibilidad' });
    }
});

// Registrar usuario
app.post('/api/auth/register', async (req, res) => {
    try {
        const { nombre, apellidos, edad, email, password } = req.body;
        
        // Verificar si existe
        const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar usuario
        const newUser = await pool.query(
            'INSERT INTO usuarios (nombre, apellidos, edad, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre, email, rol',
            [nombre, apellidos, edad, email, hashedPassword]
        );

        // Generar JWT
        const token = jwt.sign(
            { id: newUser.rows[0].id, rol: newUser.rows[0].rol, nombre: newUser.rows[0].nombre },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: newUser.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Iniciar sesión
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.rows[0].id, rol: user.rows[0].rol, nombre: user.rows[0].nombre },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.rows[0].id, nombre: user.rows[0].nombre, email: user.rows[0].email, rol: user.rows[0].rol } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// === RUTAS DEL INVENTARIO (LIBROS) ===

// Obtener todos los libros
app.get('/api/libros', async (req, res) => {
    try {
        const allBooks = await pool.query('SELECT * FROM libros ORDER BY id DESC');
        res.json(allBooks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Buscar libros por título o ID (AJAX)
app.get('/api/buscar-libros', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.json([]);
        
        let result;
        // Verificar si es un número entero válido para ID
        const isNumber = /^\d+$/.test(query);
        
        if (isNumber) {
            // Es un número, buscar por ID
            result = await pool.query('SELECT * FROM libros WHERE id = $1', [parseInt(query)]);
        } else {
            // Es texto, buscar por título (case insensitive)
            result = await pool.query('SELECT * FROM libros WHERE LOWER(titulo) LIKE LOWER($1)', [`%${query}%`]);
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error en búsqueda:', err.message);
        res.status(500).json({ error: 'Error en la búsqueda' });
    }
});

// Añadir un nuevo libro
app.post('/api/libros', upload.single('imagen_file'), async (req, res) => {
    try {
        const { titulo, autor, editorial, anio, precio, categorias, cantidad } = req.body;
        
        // Si hay archivo subido, usamos esa ruta, sino la url de texto
        let final_imagen_url = req.body.imagen_url;
        if (req.file) {
            final_imagen_url = '../imagenes/' + req.file.filename;
        }

        const newBook = await pool.query(
            'INSERT INTO libros (titulo, autor, editorial, anio, precio, imagen_url, categorias, cantidad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [titulo, autor, editorial, anio, precio, final_imagen_url, categorias, cantidad || 0]
        );
        res.json(newBook.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Actualizar un libro
app.put('/api/libros/:id', upload.single('imagen_file'), async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, editorial, anio, precio, categorias, cantidad } = req.body;
        
        let final_imagen_url = req.body.imagen_url;
        if (req.file) {
            final_imagen_url = '../imagenes/' + req.file.filename;
        }

        const updateBook = await pool.query(
            'UPDATE libros SET titulo = $1, autor = $2, editorial = $3, anio = $4, precio = $5, imagen_url = $6, categorias = $7, cantidad = $8 WHERE id = $9 RETURNING *',
            [titulo, autor, editorial, anio, precio, final_imagen_url, categorias, cantidad || 0, id]
        );
        res.json(updateBook.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

// Eliminar un libro
app.delete('/api/libros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM libros WHERE id = $1', [id]);
        res.json({ message: 'Libro eliminado exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
