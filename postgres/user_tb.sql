

-- Started on 2022-11-18 14:04:13 +07

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
-- TOC entry 212 (class 1259 OID 21198)
-- Name: user_tb; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tb (
    gid integer NOT NULL,
    userid text,
    username text,
    email text,
    dt timestamp without time zone,
    user_type text
);


ALTER TABLE public.user_tb OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 21204)
-- Name: user_tb_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_tb_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_tb_gid_seq OWNER TO postgres;

--
-- TOC entry 3708 (class 0 OID 0)
-- Dependencies: 213
-- Name: user_tb_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_tb_gid_seq OWNED BY public.user_tb.gid;


--
-- TOC entry 3567 (class 2604 OID 21207)
-- Name: user_tb gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tb ALTER COLUMN gid SET DEFAULT nextval('public.user_tb_gid_seq'::regclass);


--
-- TOC entry 3701 (class 0 OID 21198)
-- Dependencies: 212
-- Data for Name: user_tb; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_tb (gid, userid, username, email, dt, user_type) FROM stdin;
24	U7c3b13780e6a1ef9862dff22359a1068	rtk-landmos	rtkgnsscmu@gmail.com	2022-01-16 20:38:45.483672	admin
35	Ufee6643eddd2fee449614e4be4582ed0	ธนากร มณีวัฒน์	597765@egat.co.th	2022-03-30 18:07:35.215718	\N
28	Uefeb26d905c7f3439231fac6fd7c4ad5	อัษฎาวุธ ตอนจักร์	590701@egat.co.th	2022-01-24 15:21:39.505037	\N
36	Udd8d618ca8165010db1282bee132fe12	ชัยรัตน์	ศิลปสมศักดิ์	2022-03-30 19:22:43.080463	\N
29	Uff233f2397036e5fe2b804dd5b13a642	Jakgrit Sittiyoth	art.Survey49@gmail.com	2022-01-24 15:22:09.860873	\N
37	U716fbfad157cb0f14d86515560546ec1	เกษม มงคลเกียรติชัย	kasem.mo@egat.co.th	2022-03-31 09:24:21.688741	\N
31	U1ac4acdcfaa921e2c086f0b89886c450	วรวุฒิ สวัสดี	worrawut.sa@egat.co.th	2022-01-24 15:22:39.583198	\N
32	Ud2af27a43457948ab49368e9a07a06ec	Thananan Sankumlue	golf.peeba@gmail.com	2022-01-24 15:28:43.366926	\N
33	Uac12289eb641767fcb246a55aca6a35d	ภานุวัฒน์ ทะนะอ้น	kittiwat_yeans49@hotmail.com	2022-01-24 15:31:14.409798	\N
39	U4eaf6863a456a96c05d5f70fce4d96d6	พิภพ วงศ์ใหญ่	pipop.w@egat.co.th	2022-04-19 10:52:24.854638	\N
30	U2057f074d106d217c28d53c80b6dfb4f	ธเนศพล บุญประกอบ	thanatepol.boo@egat.co.th	2022-01-24 15:22:09.020021	\N
25	Uc8bbda3caf7258210bb744ec107cc6d9	พรชัย พรชัยพูลทวี	pornchai_pornchai@cmu.ac.th	2022-01-17 00:17:14.557695	\N
38	U4250baad4a6761818f539fdd14cecd16	ธีรดนย์ ทองคำ	597050@egat.co.th	2022-04-18 16:29:33.624144	\N
26	U62bc63e9ad35214197ff9f6df1ed49c3	เขตโสภณ ภิญโญ	khetsophon.phinyo@gmail.com	2022-01-24 15:20:33.86075	\N
27	Ufcbb7f102732e9fc620b4f5c395a9e1a	บุญฤทธิ์ เขียวอร่าม	boonyarit.k@egat.co.th	2022-01-24 15:24:28.205131	\N
34	U1107ff36b44eebc3df6536481745b1b6	พุทธิพล ดำรงชัย	puttipol.d@cmu.ac.th	2022-01-26 09:33:50.297171	admin
23	U965ffd9d29355690135457fca9166679	Chawis	\N	2022-01-16 13:07:23.897201	\N
\.


--
-- TOC entry 3709 (class 0 OID 0)
-- Dependencies: 213
-- Name: user_tb_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_tb_gid_seq', 39, true);


-- Completed on 2022-11-18 14:04:14 +07

--
-- PostgreSQL database dump complete
--

