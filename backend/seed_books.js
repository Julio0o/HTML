const pool = require('./db');

const librosOriginales = [
    { titulo: "Heartless", autor: "Marissa Meyer", editorial: "V&R", anio: 2016, precio: 276.69, imagen_url: "../../imagenes/heartless.png", categorias: "Sagas, Juvenil", cantidad: 10 },
    { titulo: "Temporada de Huracanes", autor: "Fernanda Melchor", editorial: "Random House", anio: 2017, precio: 199.99, imagen_url: "../../imagenes/temporada.jpg", categorias: "Clásicos, Mexicano", cantidad: 5 },
    { titulo: "Armonía ilustrada", autor: "Brian Calipari", editorial: "Ilustra", anio: 2020, precio: 839.64, imagen_url: "../../imagenes/armonia.jpg", categorias: "Arte, Ilustración", cantidad: 3 },
    { titulo: "Frankenstein", autor: "Mary Shelley", editorial: "Clásicos", anio: 1818, precio: 289.9, imagen_url: "../../imagenes/frankeinstein.jpg", categorias: "Clásicos, Terror", cantidad: 12 },
    { titulo: "El Aliento de los Dioses", autor: "Brandon Sanderson", editorial: "Nova", anio: 2009, precio: 469.0, imagen_url: "../../imagenes/dioses.jpg", categorias: "Sagas, Fantasía", cantidad: 7 },
    { titulo: "Sociología Ambiental", autor: "Lois Lemkow", editorial: "Icaria", anio: 2002, precio: 558.89, imagen_url: "../../imagenes/sociologia.jpg", categorias: "Importados, Educación", cantidad: 4 },
    { titulo: "El gato que buscaba un Nombre", autor: "Fumiko Takeshita", editorial: "Infantil", anio: 2019, precio: 263.50, imagen_url: "../../imagenes/gato.jpg", categorias: "Infantiles, Cuentos", cantidad: 15 },
    { titulo: "Alicia en el Pais de las maravillas", autor: "Benjamin Lacombe", editorial: "Edelvives", anio: 2015, precio: 785.90, imagen_url: "../../imagenes/alicia.jpg", categorias: "Edición Limitada, Clásicos", cantidad: 2 },
    { titulo: "Almendra", autor: "Won-pyung Sohn", editorial: "Océano Gran Travesía", anio: 2020, precio: 250.00, imagen_url: "../../imagenes/almendra.jpg", categorias: "Juvenil, Contemporáneo", cantidad: 8 },
    { titulo: "Atlas", autor: "Gerard G. Harris", editorial: "Geografía", anio: 2021, precio: 300.00, imagen_url: "../../imagenes/atlas.jpg", categorias: "Educación, Referencia", cantidad: 6 },
    { titulo: "Fahrenheit 451", autor: "Ray Bradbury", editorial: "Minotauro", anio: 1953, precio: 200.00, imagen_url: "../../imagenes/farenheit.jpg", categorias: "Clásicos, Sci-Fi", cantidad: 10 },
    { titulo: "Haikyu!!", autor: "Haruichi Furudate", editorial: "Panini Manga", anio: 2012, precio: 150.00, imagen_url: "../../imagenes/haikyu.jpg", categorias: "Sagas, Manga", cantidad: 20 },
    { titulo: "La Tregua", autor: "Mario Benedetti", editorial: "Alfaguara", anio: 1960, precio: 180.00, imagen_url: "../../imagenes/tregua.jpg", categorias: "Clásicos, Novela", cantidad: 9 },
    { titulo: "Wigetta", autor: "Vegetta777 & Willyrex", editorial: "Temas de Hoy", anio: 2015, precio: 220.00, imagen_url: "../../imagenes/wigetta.jpg", categorias: "Infantiles, Aventuras", cantidad: 14 }
];

async function seed() {
    try {
        console.log('Iniciando carga de libros originales...');
        
        for (const libro of librosOriginales) {
            // Verificar si ya existe para no duplicar si se corre varias veces
            const exists = await pool.query('SELECT * FROM libros WHERE titulo = $1', [libro.titulo]);
            if (exists.rows.length === 0) {
                await pool.query(
                    'INSERT INTO libros (titulo, autor, editorial, anio, precio, imagen_url, categorias, cantidad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                    [libro.titulo, libro.autor, libro.editorial, libro.anio, libro.precio, libro.imagen_url, libro.categorias, libro.cantidad]
                );
                console.log(`✅ Libro añadido: ${libro.titulo}`);
            } else {
                console.log(`🟡 El libro "${libro.titulo}" ya existe en la base de datos.`);
            }
        }
        
        console.log('¡Proceso de carga finalizado con éxito!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error cargando libros:', err);
        process.exit(1);
    }
}

seed();
