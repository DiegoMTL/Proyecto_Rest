--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

-- Started on 2021-07-12 04:51:34 -04

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
-- TOC entry 3013 (class 1262 OID 16429)
-- Name: sismos; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sismos WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'es_CL.UTF-8' LC_CTYPE = 'es_CL.UTF-8';


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
-- TOC entry 202 (class 1259 OID 16430)
-- Name: sismos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sismos (
    id bigint NOT NULL,
    fecha text NOT NULL,
    latitud double precision NOT NULL,
    longitud double precision NOT NULL,
    profundidad integer NOT NULL,
    magnitud double precision NOT NULL,
    referencia text NOT NULL
);


ALTER TABLE public.sismos OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16438)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    token text[] NOT NULL,
    "user" text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 3006 (class 0 OID 16430)
-- Dependencies: 202
-- Data for Name: sismos; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3007 (class 0 OID 16438)
-- Dependencies: 203
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2877 (class 2606 OID 16437)
-- Name: sismos sismos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sismos
    ADD CONSTRAINT sismos_pkey PRIMARY KEY (id);


--
-- TOC entry 2879 (class 2606 OID 16445)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


-- Completed on 2021-07-12 04:51:35 -04

--
-- PostgreSQL database dump complete
--

