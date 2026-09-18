import pool from "../db/config.js";


// Consulta todos los autores registrados en la base de datos.
// Los resultados se ordenan por la fecha de creación para mantener
// un orden consistente en la respuesta.
export async function getAllAuthorsServices() {

    const resultado = await pool.query(
        "SELECT * FROM authors ORDER BY created_at"
    );

    return resultado.rows;
}


// Consulta un autor específico utilizando su id.
// La consulta parametrizada permite enviar el valor de forma segura
// y evita construir directamente el SQL con datos recibidos del cliente.
export async function getAuthorByIdServices(id) {

    const resultado = await pool.query(
        "SELECT * FROM authors WHERE id = $1",
        [id]
    );

    // Retorna únicamente el autor encontrado.
// Si el id no existe, el resultado será undefined.
    return resultado.rows[0];
}


// Crea un nuevo autor utilizando los datos recibidos.
// Si el campo bio no se proporciona, se almacena como NULL en la base de datos.
export async function createAuthorsServices(name, email, bio) {

    const resultado = await pool.query(
        `
        INSERT INTO authors (name, email, bio)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [name, email, bio || null]
    );

    // RETURNING * permite obtener el registro recién creado.
    return resultado.rows[0];
}


// Elimina un autor utilizando su id.
// La eliminación se realiza directamente en la base de datos y
// RETURNING * permite recuperar el registro que fue eliminado.
export async function deleteAuthorsServices(id) {

    const resultado = await pool.query(
        `
        DELETE FROM authors
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    // Retorna el autor eliminado para que el controller
    // pueda construir la respuesta correspondiente.
    return resultado.rows[0];
}


// Actualiza los datos de un autor existente.
// El id se utiliza para identificar el registro que debe modificarse.
export async function updateAuthorsServices(id, name, email, bio) {

    const resultado = await pool.query(
        `
        UPDATE authors
        SET name = $1,
            email = $2,
            bio = $3
        WHERE id = $4
        RETURNING *
        `,
        [name, email, bio, id]
    );

    // Si el autor existe, retorna el registro actualizado.
// Si no existe, será undefined.
    return resultado.rows[0];
}