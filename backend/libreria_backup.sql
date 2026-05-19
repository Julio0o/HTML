--
-- PostgreSQL database dump
--

\restrict n1DBjjvOMOuQMBoq3uQy8VLiC2c1o71Ntx7f1aaNKSUOy7IUB8jh4YukqzcZVXW

-- Dumped from database version 17.6 (Homebrew)
-- Dumped by pg_dump version 17.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: libros; Type: TABLE; Schema: public; Owner: julio
--

CREATE TABLE public.libros (
    id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    autor character varying(150) NOT NULL,
    editorial character varying(100),
    anio integer,
    precio numeric(10,2) NOT NULL,
    imagen_url character varying(500),
    creado_en timestamp without time zone DEFAULT now(),
    categorias character varying(255),
    cantidad integer DEFAULT 0
);


ALTER TABLE public.libros OWNER TO julio;

--
-- Name: libros_id_seq; Type: SEQUENCE; Schema: public; Owner: julio
--

CREATE SEQUENCE public.libros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.libros_id_seq OWNER TO julio;

--
-- Name: libros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: julio
--

ALTER SEQUENCE public.libros_id_seq OWNED BY public.libros.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: julio
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellidos character varying(100),
    edad integer,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'cliente'::character varying,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.usuarios OWNER TO julio;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: julio
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO julio;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: julio
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: libros id; Type: DEFAULT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.libros ALTER COLUMN id SET DEFAULT nextval('public.libros_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: libros; Type: TABLE DATA; Schema: public; Owner: julio
--

COPY public.libros (id, titulo, autor, editorial, anio, precio, imagen_url, creado_en, categorias, cantidad) FROM stdin;
3	Heartless	Marissa Meyer	V&R	2016	276.69	../imagenes/heartless.png	2026-05-01 01:10:39.066716	Sagas, Juvenil	10
4	Temporada de Huracanes	Fernanda Melchor	Random House	2017	199.99	../imagenes/temporada.jpg	2026-05-01 01:10:39.074636	Clásicos, Mexicano	5
5	Armonía ilustrada	Brian Calipari	Ilustra	2020	839.64	../imagenes/armonia.jpg	2026-05-01 01:10:39.076351	Arte, Ilustración	3
6	Frankenstein	Mary Shelley	Clásicos	1818	289.90	../imagenes/frankeinstein.jpg	2026-05-01 01:10:39.07822	Clásicos, Terror	12
7	El Aliento de los Dioses	Brandon Sanderson	Nova	2009	469.00	../imagenes/dioses.jpg	2026-05-01 01:10:39.080465	Sagas, Fantasía	7
8	Sociología Ambiental	Lois Lemkow	Icaria	2002	558.89	../imagenes/sociologia.jpg	2026-05-01 01:10:39.082274	Importados, Educación	4
9	El gato que buscaba un Nombre	Fumiko Takeshita	Infantil	2019	263.50	../imagenes/gato.jpg	2026-05-01 01:10:39.083538	Infantiles, Cuentos	15
10	Alicia en el Pais de las maravillas	Benjamin Lacombe	Edelvives	2015	785.90	../imagenes/alicia.jpg	2026-05-01 01:10:39.084672	Edición Limitada, Clásicos	2
11	Almendra	Won-pyung Sohn	Océano Gran Travesía	2020	250.00	../imagenes/almendra.jpg	2026-05-01 01:10:39.086146	Juvenil, Contemporáneo	8
12	Atlas	Gerard G. Harris	Geografía	2021	300.00	../imagenes/atlas.jpg	2026-05-01 01:10:39.087279	Educación, Referencia	6
13	Fahrenheit 451	Ray Bradbury	Minotauro	1953	200.00	../imagenes/farenheit.jpg	2026-05-01 01:10:39.088356	Clásicos, Sci-Fi	10
14	Haikyu!!	Haruichi Furudate	Panini Manga	2012	150.00	../imagenes/haikyu.jpg	2026-05-01 01:10:39.089592	Sagas, Manga	20
15	La Tregua	Mario Benedetti	Alfaguara	1960	180.00	../imagenes/tregua.jpg	2026-05-01 01:10:39.090711	Clásicos, Novela	9
16	Wigetta	Vegetta777 & Willyrex	Temas de Hoy	2015	220.00	../imagenes/wigetta.jpg	2026-05-01 01:10:39.09183	Infantiles, Aventuras	14
2	El señor de los anillos	J.R.R Tolkien	Neptuno	1954	534.20	../imagenes/1777618681345-234748093.jpg	2026-05-01 00:58:01.455218	Clásicos, Sagas	12
23	azul	julio	minoin	200	234.00	../imagenes/1778209327318-437150038.png	2026-05-07 21:02:07.329177	Importados	0
24	amarillo	yo	joh	2025	2345.00	../imagenes/1778209674560-988433804.png	2026-05-07 21:07:54.565511	Importados	10
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: julio
--

COPY public.usuarios (id, nombre, apellidos, edad, email, password, rol, creado_en) FROM stdin;
1	Alessa	Mercado Hernandez	21	alessamercadohernandez@gmail.com	$2b$10$YD0Tr8tIqtqU3N3HqPImbOHDPr7VikZLpjW1KhdU1jB5RZuIxDN9m	admin	2026-05-01 00:31:25.699546
2	Andra	Hdez M	22	andra1701005@gmail.com	$2b$10$RnCPsepifTlad1.LBVGt1.R63nHna4lY9V1.tYhwcPMMliaGGxBAC	cliente	2026-05-04 22:45:23.931172
4	julio	gtz	21	julio180305@gmail.com	$2b$10$Gvg5oOpT0VDJtwskd/OeteqfoTvb/Czpui7mpnoV9TnRBALmy1Jf2	admin	2026-05-05 21:25:38.695272
6	cesar	cesarin	30	cesar123@gmail.com	$2b$10$w8GHJp5oq5g4sJwJFPqune2J73.IvXfjUPYKwfxNaAmJUt4GmAfEW	cliente	2026-05-07 20:48:06.758121
3	cesar	rico	90	juan.perez@test.com	$2b$10$jNBuZpAsSlJYtGcaPLQS7edhbtJGH8dTWa66CANlOXtgsofiGHGmy	cliente	2026-05-05 21:22:40.965663
7	roberto	diaz	18	roberto@gmail.com	$2b$10$2V1xrc49naSzx8LTVRNxaeiVZpPV62SESzPYRPhSoBMggcFa3qkke	cliente	2026-05-07 21:09:19.017278
\.


--
-- Name: libros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: julio
--

SELECT pg_catalog.setval('public.libros_id_seq', 24, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: julio
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 7, true);


--
-- Name: libros libros_pkey; Type: CONSTRAINT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id);


--
-- Name: libros libros_titulo_key; Type: CONSTRAINT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_titulo_key UNIQUE (titulo);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: julio
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict n1DBjjvOMOuQMBoq3uQy8VLiC2c1o71Ntx7f1aaNKSUOy7IUB8jh4YukqzcZVXW

