--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: Auctions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Auctions" (
    "Id" text NOT NULL,
    "ItemId" text NOT NULL,
    "Name" text NOT NULL,
    "Categories" text[],
    "Currently" text,
    "BuyPrice" text,
    "FirstBid" text,
    "NumberOfBids" text,
    "Bids" text,
    "Bid" text,
    "Location" text,
    "Started" date,
    "Ends" date,
    "Seller" text,
    "Description" text,
    "UserId" text NOT NULL
);


ALTER TABLE public."Auctions" OWNER TO postgres;

--
-- Name: UserRoles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserRoles" (
    "Id" text NOT NULL,
    "Role" text NOT NULL
);


ALTER TABLE public."UserRoles" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "Id" text NOT NULL,
    "Username" text NOT NULL,
    "Password" text NOT NULL,
    "Pending" boolean NOT NULL,
    "Name" text NOT NULL,
    "Surname" text NOT NULL,
    "Phone" text NOT NULL,
    "Address" text NOT NULL,
    "Afm" text NOT NULL,
    "Email" text NOT NULL,
    "UserRole" text NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Data for Name: Auctions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Auctions" ("Id", "ItemId", "Name", "Categories", "Currently", "BuyPrice", "FirstBid", "NumberOfBids", "Bids", "Bid", "Location", "Started", "Ends", "Seller", "Description", "UserId") FROM stdin;
f3f6ff5b-c34f-4214-9bec-13b2c3b7a1c0	4280387012	╬ö╬À╬╝╬┐¤Ç¤ü╬▒¤â╬»╬▒ 1	{}	\N			\N	\N	\N	\N	\N	\N	\N	Dokimastiko 1	df1acd40-3854-417a-80d8-f286ae425fb6
21ce6e1b-9f3f-4a6d-8f42-048d3448ce17	2095513148	╬ö╬À╬╝╬┐¤Ç¤ü╬▒¤â╬»╬▒ 2	{}	\N			\N	\N	\N	\N	\N	\N	\N	╬ö╬┐╬║╬╣╬╝╬▒¤â¤ä╬╣╬║¤î ╬Ü╬Á╬»╬╝╬Á╬¢╬┐ 2	df1acd40-3854-417a-80d8-f286ae425fb6
d09c8223-6892-4e7a-b859-fd7bb9d704b8	7225516707	╬ö╬À╬╝╬┐¤Ç¤ü╬▒¤â╬»╬▒ 3	{}	\N			\N	\N	\N	\N	\N	\N	\N	╬ö╬┐╬║╬╣╬╝╬▒¤â¤ä╬╣╬║¤î ╬Ü╬Á╬»╬╝╬Á╬¢╬┐ 3	df1acd40-3854-417a-80d8-f286ae425fb6
\.


--
-- Data for Name: UserRoles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserRoles" ("Id", "Role") FROM stdin;
61717681-4ed0-47bd-8d67-3833c85f8e2e	Administrator
667ead04-597f-4417-aaea-9b3cee36715e	Seller
aafc2a5f-675a-42e7-8a8d-ef762cf3f53e	Client
f7703f41-958e-491b-a005-8372112d17e0	Bidder
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Id", "Username", "Password", "Pending", "Name", "Surname", "Phone", "Address", "Afm", "Email", "UserRole") FROM stdin;
9d7f1d65-6354-4cf5-9e9b-aa5f5ca83503	admin	ODFkYzliZGI1MmQwNGRjMjAwMzZkYmQ4MzEzZWQwNTU=	f	admin	admin	35435	sdfsd	435435	aggelos@aggelos.gr	61717681-4ed0-47bd-8d67-3833c85f8e2e
df1acd40-3854-417a-80d8-f286ae425fb6	aggelos	ODFkYzliZGI1MmQwNGRjMjAwMzZkYmQ4MzEzZWQwNTU=	f	aggelos	fakorellis	56546564	test 	43534535	aggelosfk1@gmail.com	aafc2a5f-675a-42e7-8a8d-ef762cf3f53e
\.


--
-- Name: Auctions Auctions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auctions"
    ADD CONSTRAINT "Auctions_pkey" PRIMARY KEY ("Id");


--
-- Name: UserRoles UserRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRoles"
    ADD CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("Id");


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("Id");


--
-- PostgreSQL database dump complete
--

