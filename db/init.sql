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
    "Location" text,
    "Started" date,
    "Ends" date,
    "Seller" text,
    "Description" text,
    "UserId" text NOT NULL,
    "hasStarted" boolean NOT NULL,
    "hasEnded" boolean
);


ALTER TABLE public."Auctions" OWNER TO postgres;

--
-- Name: Bids; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bids" (
    "Id" text NOT NULL,
    "AuctionId" text NOT NULL,
    "Amount" text NOT NULL,
    "Location" text NOT NULL,
    "Country" text NOT NULL,
    "Time" timestamp without time zone NOT NULL,
    "UserId" text NOT NULL
);


ALTER TABLE public."Bids" OWNER TO postgres;

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

COPY public."Auctions" ("Id", "ItemId", "Name", "Categories", "Currently", "BuyPrice", "FirstBid", "Location", "Started", "Ends", "Seller", "Description", "UserId", "hasStarted", "hasEnded") FROM stdin;
\.


--
-- Data for Name: Bids; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bids" ("Id", "AuctionId", "Amount", "Location", "Country", "Time", "UserId") FROM stdin;
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
\.


--
-- Name: Auctions Auctions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Auctions"
    ADD CONSTRAINT "Auctions_pkey" PRIMARY KEY ("Id");


--
-- Name: Bids Bids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bids"
    ADD CONSTRAINT "Bids_pkey" PRIMARY KEY ("Id");


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

