--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.0

-- Started on 2023-12-04 22:12:40 MST

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: phonedb_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO phonedb_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16397)
-- Name: mobilephone; Type: TABLE; Schema: public; Owner: phonedb_user
--

CREATE TABLE public.mobilephone (
    phone_id integer NOT NULL,
    year integer NOT NULL,
    brand character varying(2083),
    make character varying(2083),
    model character varying(2083)
);


ALTER TABLE public.mobilephone OWNER TO phonedb_user;

--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: retailer; Type: TABLE; Schema: public; Owner: phonedb_user
--

CREATE TABLE public.retailer (
    retailer_id integer NOT NULL,
    name character varying(2083),
    website character varying(2083)
);


ALTER TABLE public.retailer OWNER TO phonedb_user;

--
-- TOC entry 218 (class 1259 OID 16431)
-- Name: retrieveprice; Type: TABLE; Schema: public; Owner: phonedb_user
--

CREATE TABLE public.retrieveprice (
    phone_id integer NOT NULL,
    retailer_id integer NOT NULL,
    price double precision
);


ALTER TABLE public.retrieveprice OWNER TO phonedb_user;

--
-- TOC entry 215 (class 1259 OID 16404)
-- Name: users; Type: TABLE; Schema: public; Owner: phonedb_user
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20),
    password character varying(20)
);


ALTER TABLE public.users OWNER TO phonedb_user;

--
-- TOC entry 217 (class 1259 OID 16416)
-- Name: writereview; Type: TABLE; Schema: public; Owner: phonedb_user
--

CREATE TABLE public.writereview (
    phone_id integer NOT NULL,
    user_id integer NOT NULL,
    rating_point integer
);


ALTER TABLE public.writereview OWNER TO phonedb_user;

--
-- TOC entry 3162 (class 0 OID 16397)
-- Dependencies: 214
-- Data for Name: mobilephone; Type: TABLE DATA; Schema: public; Owner: phonedb_user
--

COPY public.mobilephone (phone_id, year, brand, make, model) FROM stdin;
1	2023	Apple	iPhone	15
2	2023	Apple	iPhone	15 Plus
3	2023	Apple	iPhone	15 Pro
4	2023	Apple	iPhone	15 Pro Max
5	2022	Apple	iPhone	14
6	2022	Apple	iPhone	14 Plus
7	2023	Samsung	Galaxy	S23
8	2023	Samsung	Galaxy	S23+
9	2023	Samsung	Galaxy	S23 Ultra
10	2023	Samsung	Galaxy	S23 FE
11	2022	Apple	iPhone	14 Pro
12	2022	Apple	iPhone	14 Pro Max
13	2022	Samsung	Galaxy	S22
14	2022	Samsung	Galaxy	S22+
15	2022	Samsung	Galaxy	S22 Ultra
\.


--
-- TOC entry 3164 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: retailer; Type: TABLE DATA; Schema: public; Owner: phonedb_user
--

COPY public.retailer (retailer_id, name, website) FROM stdin;
1	Amazon	www.amazon.com
2	Best Buy	www.bestbuy.com
\.


--
-- TOC entry 3166 (class 0 OID 16431)
-- Dependencies: 218
-- Data for Name: retrieveprice; Type: TABLE DATA; Schema: public; Owner: phonedb_user
--

COPY public.retrieveprice (phone_id, retailer_id, price) FROM stdin;
1	1	775.99
2	1	1098.95
3	1	1250
6	1	654.36
7	1	502.43
8	1	584.43
9	1	961.22
10	1	598
11	1	685
4	1	1329
5	1	550.44
13	1	486.64
14	1	359.99
15	1	639.1
1	2	829.8
2	2	930.24
3	2	1000.08
12	1	800
4	2	1200.24
5	2	729.99
6	2	829.99
7	2	699.99
8	2	999.99
9	2	1199.99
10	2	499.99
11	2	999.72
12	2	1099.8
13	2	399.96
14	2	999.99
15	2	499.68
\.


--
-- TOC entry 3163 (class 0 OID 16404)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: phonedb_user
--

COPY public.users (user_id, username, password) FROM stdin;
1	test	1234
2	test2	1234
3	test3	1234
4	test5	1234
5	newuser	12345
\.


--
-- TOC entry 3165 (class 0 OID 16416)
-- Dependencies: 217
-- Data for Name: writereview; Type: TABLE DATA; Schema: public; Owner: phonedb_user
--

COPY public.writereview (phone_id, user_id, rating_point) FROM stdin;
4	1	1
4	2	4
1	2	4
1	3	3
1	1	5
2	1	5
\.


--
-- TOC entry 3008 (class 2606 OID 16403)
-- Name: mobilephone mobilephone_pkey; Type: CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.mobilephone
    ADD CONSTRAINT mobilephone_pkey PRIMARY KEY (phone_id);


--
-- TOC entry 3012 (class 2606 OID 16415)
-- Name: retailer retailer_pkey; Type: CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.retailer
    ADD CONSTRAINT retailer_pkey PRIMARY KEY (retailer_id);


--
-- TOC entry 3016 (class 2606 OID 16435)
-- Name: retrieveprice retrieveprice_pkey; Type: CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.retrieveprice
    ADD CONSTRAINT retrieveprice_pkey PRIMARY KEY (phone_id, retailer_id);


--
-- TOC entry 3010 (class 2606 OID 16408)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3014 (class 2606 OID 16420)
-- Name: writereview writereview_pkey; Type: CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.writereview
    ADD CONSTRAINT writereview_pkey PRIMARY KEY (phone_id, user_id);


--
-- TOC entry 3018 (class 2606 OID 16436)
-- Name: retrieveprice retrieveprice_phone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.retrieveprice
    ADD CONSTRAINT retrieveprice_phone_id_fkey FOREIGN KEY (phone_id) REFERENCES public.mobilephone(phone_id) ON DELETE CASCADE;


--
-- TOC entry 3019 (class 2606 OID 16441)
-- Name: retrieveprice retrieveprice_retailer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.retrieveprice
    ADD CONSTRAINT retrieveprice_retailer_id_fkey FOREIGN KEY (retailer_id) REFERENCES public.retailer(retailer_id) ON DELETE CASCADE;


--
-- TOC entry 3017 (class 2606 OID 16421)
-- Name: writereview writereview_phone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: phonedb_user
--

ALTER TABLE ONLY public.writereview
    ADD CONSTRAINT writereview_phone_id_fkey FOREIGN KEY (phone_id) REFERENCES public.mobilephone(phone_id) ON DELETE CASCADE;


--
-- TOC entry 2051 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO phonedb_user;


--
-- TOC entry 2053 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO phonedb_user;


--
-- TOC entry 2052 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO phonedb_user;


--
-- TOC entry 2050 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO phonedb_user;


-- Completed on 2023-12-04 22:12:45 MST

--
-- PostgreSQL database dump complete
--

