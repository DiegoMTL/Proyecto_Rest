--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-0ubuntu0.21.04.1)

-- Started on 2021-07-12 20:59:22 -04

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

--
-- TOC entry 3038 (class 1262 OID 57372)
-- Name: sismos; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sismos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'es_CL.UTF-8';


ALTER DATABASE sismos OWNER TO postgres;

\connect sismos

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
-- TOC entry 201 (class 1259 OID 57398)
-- Name: sismos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sismos (
    id integer NOT NULL,
    fecha text NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    profundidad integer NOT NULL,
    magnitud double precision NOT NULL,
    referencia text NOT NULL
);


ALTER TABLE public.sismos OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 57396)
-- Name: sismos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sismos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sismos_id_seq OWNER TO postgres;

--
-- TOC entry 3039 (class 0 OID 0)
-- Dependencies: 200
-- Name: sismos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sismos_id_seq OWNED BY public.sismos.id;


--
-- TOC entry 202 (class 1259 OID 57414)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    nombre text NOT NULL,
    apellido text NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 2895 (class 2604 OID 57401)
-- Name: sismos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sismos ALTER COLUMN id SET DEFAULT nextval('public.sismos_id_seq'::regclass);


--
-- TOC entry 3031 (class 0 OID 57398)
-- Dependencies: 201
-- Data for Name: sismos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3032 (class 0 OID 57414)
-- Dependencies: 202
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3040 (class 0 OID 0)
-- Dependencies: 200
-- Name: sismos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sismos_id_seq', 1, false);


--
-- TOC entry 2897 (class 2606 OID 57427)
-- Name: sismos sismos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sismos
    ADD CONSTRAINT sismos_pkey PRIMARY KEY (id);


--
-- TOC entry 2899 (class 2606 OID 57421)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (token);


-- Completed on 2021-07-12 20:59:22 -04

--
-- PostgreSQL database dump complete
--

