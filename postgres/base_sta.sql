
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
-- TOC entry 208 (class 1259 OID 21182)
-- Name: base_sta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.base_sta (
    id integer,
    stat_code character varying,
    stat_name character varying,
    x_coor double precision,
    y_coor double precision,
    elev double precision,
    "timestamp" timestamp without time zone,
    diff double precision,
    status integer,
    com_status character varying
);


ALTER TABLE public.base_sta OWNER TO postgres;

--
-- TOC entry 3698 (class 0 OID 21182)
-- Dependencies: 208
-- Data for Name: base_sta; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (1, 'rtk01', 'สถานีที่ 1', 99.68745015, 18.33223165, 440.456, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (2, 'rtk02', 'สถานีที่ 2', 99.6984741666667, 18.35877815, 443.429, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (3, 'rtk03', 'สถานีที่ 3', 99.6902706666667, 18.3399935333333, 428.455, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (4, 'rtk04', 'สถานีที่ 4', 99.6907212333333, 18.3359518666667, 408.064, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (5, 'rtk05', 'สถานีที่ 5', 99.7235667833333, 18.376111, 438.257, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (6, 'rtk06', 'สถานีที่ 6', 99.6980675333333, 18.3593176166667, 459.07, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (7, 'rtk07', 'สถานีที่ 7', 99.7259994166667, 18.3768023666667, 402.896, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (8, 'rtk08', 'สถานีที่ 8', 98.95291225, 18.7953449666667, 342.484, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (9, 'rtk09', 'สถานีที่ 9', 99.7327561, 18.3033678, 324.968, NULL, NULL, NULL, NULL);
INSERT INTO public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) VALUES (10, 'rtk10', 'สถานีที่ 10', 99.7267820666667, 18.3774593, 390.436, NULL, NULL, NULL, NULL);


-- Completed on 2022-11-18 14:02:56 +07

--
-- PostgreSQL database dump complete
--

