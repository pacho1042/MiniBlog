-- ============================================================
-- SETUP BASE DE DATOS MINI BLOG
-- ============================================================

-- Si la base de datos ya existe, la elimina.
-- Esto permite ejecutar nuevamente este archivo desde cero.
DROP DATABASE IF EXISTS miniBlog;

-- Crea la base de datos.
CREATE DATABASE miniBlog;


-- ============================================================
-- TABLA AUTHORS
-- ============================================================
-- Almacena la información de los autores de los posts.

CREATE TABLE authors (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    bio         TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- TABLA POSTS
-- ============================================================
-- Almacena los posts publicados por los autores.
-- author_id establece la relación entre posts y authors.

CREATE TABLE posts (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100) NOT NULL,
    author_id   INTEGER NOT NULL,
    published   BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE CASCADE
);



