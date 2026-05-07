--
-- PostgreSQL database dump
--

\restrict MuQr0jXj9pLpQrzEAewzp378aLhHKifKhWwlfP5wdaO9SpSYexEELMfNCZBQo72

-- Dumped from database version 15.16
-- Dumped by pg_dump version 15.16

-- Started on 2026-05-05 18:21:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 217 (class 1259 OID 74602)
-- Name: libros; Type: TABLE; Schema: public; Owner: postgres
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
-- TOC entry 216 (class 1259 OID 74601)
-- Name: libros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.libros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.libros_id_seq OWNER TO julio;

--
-- TOC entry 3341 (class 0 OID 0)
-- Dependencies: 216
-- Name: libros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.libros_id_seq OWNED BY public.libros.id;


--
-- TOC entry 215 (class 1259 OID 74589)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
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
-- TOC entry 214 (class 1259 OID 74588)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO julio;

--
-- TOC entry 3342 (class 0 OID 0)
-- Dependencies: 214
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 3181 (class 2604 OID 74605)
-- Name: libros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros ALTER COLUMN id SET DEFAULT nextval('public.libros_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 74592)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 3335 (class 0 OID 74602)
-- Dependencies: 217
-- Data for Name: libros; Type: TABLE DATA; Schema: public; Owner: postgres
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
\.


--
-- TOC entry 3333 (class 0 OID 74589)
-- Dependencies: 215
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellidos, edad, email, password, rol, creado_en) FROM stdin;
1	Alessa	Mercado Hernandez	21	alessamercadohernandez@gmail.com	$2b$10$YD0Tr8tIqtqU3N3HqPImbOHDPr7VikZLpjW1KhdU1jB5RZuIxDN9m	admin	2026-05-01 00:31:25.699546
2	Andra	Hdez M	22	andra1701005@gmail.com	$2b$10$RnCPsepifTlad1.LBVGt1.R63nHna4lY9V1.tYhwcPMMliaGGxBAC	cliente	2026-05-04 22:45:23.931172
\.


--
-- TOC entry 3343 (class 0 OID 0)
-- Dependencies: 216
-- Name: libros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.libros_id_seq', 16, true);


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 214
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- TOC entry 3189 (class 2606 OID 74610)
-- Name: libros libros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 74600)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 3187 (class 2606 OID 74598)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


-- Completed on 2026-05-05 18:21:29

--
-- PostgreSQL database dump complete
--

\unrestrict MuQr0jXj9pLpQrzEAewzp378aLhHKifKhWwlfP5wdaO9SpSYexEELMfNCZBQo72

