import {describe, test, expect, beforeEach, afterAll} from "vitest";
import request from "supertest";
import "dotenv/config";
import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
    await pool.query("TRUNCATE TABLE posts, authors RESTART IDENTITY CASCADE");

    await pool.query(`
        INSERT INTO authors (name, email) VALUES
        ('Autor Uno', 'uno@mail.com'),
        ('Autor Dos', 'dos@mail.com')
    `);

    await pool.query(`
        INSERT INTO posts (title, author_id, published) VALUES
        ('Primer Post', 1, true),
        ('Segundo Post', 1, false)       
    `);
});
 
afterAll(async () => {
    await pool.end();
});

describe("GET /posts", () => {
    test("devuelve lista de posts con nombre del autor", async () => {
        const response = await request(app).get("/posts");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty("author_name");
    });
});

describe("GET /posts/:id", () => {
    test("devuelve los posts de un autor existente", async () => {
        const response = await request(app).get("/posts/1");

         expect(response.statusCode).toBe(200);
         expect(response.body).toHaveLength(2);

        expect(response.body[0]).toHaveProperty("author_id", 1);
        expect(response.body[0]).toHaveProperty("author_name", "Autor Uno");

        expect(response.body[1]).toHaveProperty("author_id", 1);
        expect(response.body[1]).toHaveProperty("author_name", "Autor Uno");
    });

    test("devuelve una lista vacía si el autor no tiene posts", async () => {
    const response = await request(app).get("/posts/2");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({error: "Autor existe pero aun no tiene posts registrados"});
    });

    test("devuelve 404 si el post no existe", async () => {
        const response = await request(app).get("/posts/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });
});

describe("POST /posts", () => {
    test("crea un nuevo post correctamente", async () => {
        const response = await request(app).post("/posts").send({
            title: "Post Nuevo",
            author_id: 1,
            published: true
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Post Nuevo");
    });

    test("devuelve 400 si falta el title", async () => {
        const response = await request(app).post("/posts").send({
            author_id: 1
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si el author_id no es válido", async () => {
        const response = await request(app).post("/posts").send({
            title: "Post con id inválido",
            author_id: "abc"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si el author_id no existe", async () => {
        const response = await request(app).post("/posts").send({
            title: "Post con autor inexistente",
            author_id: 9999
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
}); 

describe("PUT /posts/:id", () => {
    test("actualiza un post existente", async () => {
        const response = await request(app).put("/posts/1").send({
       
            title: "Primer Post Actualizado",
            author_id: 2,
            published: true
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe("Primer Post Actualizado");
        expect(response.body.author_id).toBe(2);
    });

    test("devuelve 404 si el post no existe", async () => {
        const response = await request(app).put("/posts/9999").send({
            title: "No existe",
            author_id: 1,
            published: false
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si el title no es válido", async () => {
        const response = await request(app).put("/posts/1").send({
            title: "F",
            author_id: 1,
            published: false
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si el author_id no existe", async () => {
        const response = await request(app).put("/posts/1").send({
            title: "Post válido",
            author_id: 9999,
            published: false
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("DELETE /posts/:id", () => {
    test("elimina un post existente", async () => {
        const response = await request(app).delete("/posts/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", 1);
    });

    test("devuelve 404 si el post no existe", async () => {
        const response = await request(app).delete("/posts/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });
});
 