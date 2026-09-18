import pool from "../db/config.js";

// Consulta todos los posts junto con el nombre del autor.
// El JOIN permite obtener información relacionada de la tabla authors
// sin necesidad de hacer una segunda consulta.
export async function getAllPostsServices() {
    
    const resultado = await pool.query(`
        SELECT posts.*, authors.name AS author_name
        FROM posts
        INNER JOIN authors ON posts.author_id = authors.id
    `);

    return resultado.rows;
}


// Consulta los posts de un autor específico utilizando su id.
// Se utiliza $1 como parámetro para enviar el id de forma segura a PostgreSQL.
export async function getPostsByIdServices(id) {
        
    const resultado = await pool.query(`
        SELECT posts.*, authors.name AS author_name, authors.email AS email
        FROM posts
        INNER JOIN authors ON posts.author_id = authors.id
        WHERE posts.author_id = $1
    `, [id]);

    // Retorna únicamente el post encontrado.
// Si no existe, será undefined.
    return resultado.rows;
}


// Crea un nuevo post en la base de datos.
// El valor de published se establece en false cuando no es enviado.
export async function createPostServices(title, author_id, published) {

    const resultado = await pool.query(
        `
        INSERT INTO posts (title, author_id, published)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [title, author_id, published ?? false]
    );

    // RETURNING * permite obtener el registro recién creado.
    return resultado.rows[0];
}


// Actualiza los datos de un post existente.
// La consulta utiliza el id para identificar qué registro debe modificarse.
export async function updatePostServices(id, title, author_id, published) {

    const resultado = await pool.query(
        `
        UPDATE posts
        SET title = $1,
            author_id = $2,
            published = $3
        WHERE id = $4
        RETURNING *
        `,
        [title, author_id, published ?? false, id]
    );

    // Si el id existe, retorna el post actualizado.
// Si no existe, será undefined.
    return resultado.rows[0];
}


// Elimina un post utilizando su id.
// RETURNING * permite devolver los datos del registro que fue eliminado.
export async function deletePostService(id) {

    const resultado = await pool.query(
        `
        DELETE FROM posts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    // Retorna el post eliminado para que el controller
    // pueda informar qué registro fue eliminado.
    return resultado.rows[0];
}