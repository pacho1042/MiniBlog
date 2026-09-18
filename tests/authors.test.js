import {describe, test, expect, beforeEach, afterAll} from "vitest";
import request from "supertest";
import "dotenv/config";
import app from "../src/app.js";
import pool from "../src/db/config.js";


 beforeEach(async()=>{
   await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");
   await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
    ('Gabriela Redondo', 'gabriela.redondo@example.com', 'Escritora especializada en literatura contemporánea.'),
    ('Ricardo Jorge', 'ricardo.jorge@example.com', 'Autor de libros de desarrollo personal y hábitos.')
`);
 });

afterAll(async()=>{
    await pool.end();
}); 

describe("GET /authors",()=>{
    test("devuelve lista de autores creados", async()=>{
      const response = await request(app).get("/authors");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty("name");
    });
});

describe("GET /authors/:id", () => {
    test("devuelve un autor existente", async () => {
        const response = await request(app).get("/authors/1");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", 1);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
    });

    test("devuelve 404 si el autor no existe", async () => {
        const response = await request(app).get("/authors/9999");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si el id no es numérico", async () => {
        const response = await request(app).get("/authors/abc");

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});

describe("POST /authors", () => {
    test("crea un nuevo autor correctamente", async () => {
        const nuevoAutor = {
            name: "Gabriel García",
            email: "gabriel@mail.com"
        };
        const response = await request(app).post("/authors").send(nuevoAutor);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(nuevoAutor.name);
        expect(response.body.email).toBe(nuevoAutor.email);
    });

    test("devuelve 400 si falta el name", async () => {
        const response = await request(app)
            .post("/authors")
            .send({ email: "sinname@mail.com" });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 400 si falta el email", async () => {
        const response = await request(app)
            .post("/authors")
            .send({ name: "Sin Email" });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("devuelve 409 si el email ya existe", async () => {
        const autorDuplicado = {
            name: "Otro Nombre",
            email: "gabriela.redondo@example.com" 
        };

        const response = await request(app).post("/authors").send(autorDuplicado);

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty("error");
    });
});

describe("PUT /authors/:id", () => {
    test("actualiza un autor existente", async () => {

         const nuevoAutor = {
            name: "Gabriel García",
            email: "gabriel@mail.com"
        };

        const response = await request(app).put("/authors/1").send(nuevoAutor);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(nuevoAutor.name);
       
    });

    test("devuelve 404 si el autor no existe", async () => {
         const nuevoAutor = {
            name: "No existe",
            email: "noexiste@mail.com"
        };        
        const response = await request(app).put("/authors/9999").send(nuevoAutor);
        expect(response.statusCode).toBe(404);
    });

    test("devuelve 400 si faltan datos requeridos", async () => {
       const nuevoAutor = {
            
            name: "Solo Nombre"
            // falta email
        }; 
       
        const response = await request(app).put("/authors/1").send(nuevoAutor);
        expect(response.statusCode).toBe(400);
    });

    test("devuelve 409 si el email ya pertenece a otro autor", async () => {
       const nuevoAutor = {
            
            name: "Autor Dos",
            email: "gabriela.redondo@example.com" // email del autor id 1, definido en beforeEach
        }; 
       
        const response = await request(app).put("/authors/2").send(nuevoAutor);
        expect(response.statusCode).toBe(409);
    });
});

describe("DELETE /authors/:id", () => {
    test("elimina un autor existente", async () => {
        const response = await request(app).delete("/authors/2");
        expect(response.statusCode).toBe(200);
    });

    test("devuelve 404 si el autor no existe", async () => {
        const response = await request(app).delete("/authors/9999");
        expect(response.statusCode).toBe(404);
    });
});

 