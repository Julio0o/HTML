-- =============================================
-- KUBO - Script de importación para Railway
-- Compatible con cualquier usuario PostgreSQL
-- =============================================

-- Secuencias
CREATE SEQUENCE IF NOT EXISTS public.usuarios_id_seq
    AS integer START WITH 1 INCREMENT BY 1
    NO MINVALUE NO MAXVALUE CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.libros_id_seq
    AS integer START WITH 1 INCREMENT BY 1
    NO MINVALUE NO MAXVALUE CACHE 1;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id integer NOT NULL DEFAULT nextval('public.usuarios_id_seq'::regclass),
    nombre character varying(100) NOT NULL,
    apellidos character varying(100),
    edad integer,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'cliente',
    creado_en timestamp without time zone DEFAULT now(),
    CONSTRAINT usuarios_pkey PRIMARY KEY (id),
    CONSTRAINT usuarios_email_key UNIQUE (email)
);

-- Tabla libros
CREATE TABLE IF NOT EXISTS public.libros (
    id integer NOT NULL DEFAULT nextval('public.libros_id_seq'::regclass),
    titulo character varying(200) NOT NULL,
    autor character varying(150) NOT NULL,
    editorial character varying(100),
    anio integer,
    precio numeric(10,2) NOT NULL,
    imagen_url character varying(500),
    creado_en timestamp without time zone DEFAULT now(),
    categorias character varying(255),
    cantidad integer DEFAULT 0,
    CONSTRAINT libros_pkey PRIMARY KEY (id)
);

-- Ajustar secuencias para que el autoincrement empiece después de los datos insertados
SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);
SELECT pg_catalog.setval('public.libros_id_seq', 16, true);

-- Datos de usuarios (contraseñas ya hasheadas con bcrypt)
INSERT INTO public.usuarios (id, nombre, apellidos, edad, email, password, rol, creado_en) VALUES
(1, 'Alessa', 'Mercado Hernandez', 21, 'alessamercadohernandez@gmail.com', '$2b$10$YD0Tr8tIqtqU3N3HqPImbOHDPr7VikZLpjW1KhdU1jB5RZuIxDN9m', 'admin', '2026-05-01 00:31:25.699546'),
(2, 'Andra', 'Hdez M', 22, 'andra1701005@gmail.com', '$2b$10$RnCPsepifTlad1.LBVGt1.R63nHna4lY9V1.tYhwcPMMliaGGxBAC', 'cliente', '2026-05-04 22:45:23.931172')
ON CONFLICT (id) DO NOTHING;

-- Datos de libros
INSERT INTO public.libros (id, titulo, autor, editorial, anio, precio, imagen_url, creado_en, categorias, cantidad) VALUES
(2,  'El señor de los anillos',          'J.R.R Tolkien',         'Neptuno',               1954, 534.20, '../imagenes/1777618681345-234748093.jpg', '2026-05-01 00:58:01.455218', 'Clásicos, Sagas',           12),
(3,  'Heartless',                         'Marissa Meyer',          'V&R',                   2016, 276.69, '../imagenes/heartless.png',              '2026-05-01 01:10:39.066716', 'Sagas, Juvenil',            10),
(4,  'Temporada de Huracanes',            'Fernanda Melchor',       'Random House',          2017, 199.99, '../imagenes/temporada.jpg',              '2026-05-01 01:10:39.074636', 'Clásicos, Mexicano',         5),
(5,  'Armonía ilustrada',                 'Brian Calipari',         'Ilustra',               2020, 839.64, '../imagenes/armonia.jpg',                '2026-05-01 01:10:39.076351', 'Arte, Ilustración',          3),
(6,  'Frankenstein',                      'Mary Shelley',           'Clásicos',              1818, 289.90, '../imagenes/frankeinstein.jpg',          '2026-05-01 01:10:39.078220', 'Clásicos, Terror',          12),
(7,  'El Aliento de los Dioses',          'Brandon Sanderson',      'Nova',                  2009, 469.00, '../imagenes/dioses.jpg',                 '2026-05-01 01:10:39.080465', 'Sagas, Fantasía',            7),
(8,  'Sociología Ambiental',              'Lois Lemkow',            'Icaria',                2002, 558.89, '../imagenes/sociologia.jpg',             '2026-05-01 01:10:39.082274', 'Importados, Educación',      4),
(9,  'El gato que buscaba un Nombre',     'Fumiko Takeshita',       'Infantil',              2019, 263.50, '../imagenes/gato.jpg',                   '2026-05-01 01:10:39.083538', 'Infantiles, Cuentos',       15),
(10, 'Alicia en el Pais de las maravillas','Benjamin Lacombe',      'Edelvives',             2015, 785.90, '../imagenes/alicia.jpg',                 '2026-05-01 01:10:39.084672', 'Edición Limitada, Clásicos', 2),
(11, 'Almendra',                          'Won-pyung Sohn',         'Océano Gran Travesía',  2020, 250.00, '../imagenes/almendra.jpg',               '2026-05-01 01:10:39.086146', 'Juvenil, Contemporáneo',     8),
(12, 'Atlas',                             'Gerard G. Harris',       'Geografía',             2021, 300.00, '../imagenes/atlas.jpg',                  '2026-05-01 01:10:39.087279', 'Educación, Referencia',      6),
(13, 'Fahrenheit 451',                    'Ray Bradbury',           'Minotauro',             1953, 200.00, '../imagenes/farenheit.jpg',              '2026-05-01 01:10:39.088356', 'Clásicos, Sci-Fi',          10),
(14, 'Haikyu!!',                          'Haruichi Furudate',      'Panini Manga',          2012, 150.00, '../imagenes/haikyu.jpg',                 '2026-05-01 01:10:39.089592', 'Sagas, Manga',              20),
(15, 'La Tregua',                         'Mario Benedetti',        'Alfaguara',             1960, 180.00, '../imagenes/tregua.jpg',                 '2026-05-01 01:10:39.090711', 'Clásicos, Novela',           9),
(16, 'Wigetta',                           'Vegetta777 & Willyrex',  'Temas de Hoy',          2015, 220.00, '../imagenes/wigetta.jpg',                '2026-05-01 01:10:39.091830', 'Infantiles, Aventuras',     14)
ON CONFLICT (id) DO NOTHING;
