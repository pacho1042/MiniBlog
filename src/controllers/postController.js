import {validarPublished,validarTitle,validarAutorId} from "../../utils/validators.js";
import {getAllPostsServices,getPostsByIdServices,createPostServices, updatePostServices,deletePostService} from "../services/postServices.js";
import {getAuthorByIdServices} from "../services/authorsServices.js";

// ============================================================
// CONSULTAR TODOS LOS POSTS
// ============================================================

/**
 * Obtiene todos los posts registrados.
 *
 * Flujo:
 * 1. El controlador solicita los datos al servicio.
 * 2. El servicio realiza la consulta a la base de datos.
 * 3. El controlador retorna el resultado al cliente.
 *
 * Respuestas:
 * - 200: posts obtenidos correctamente.
 * - 500: error interno del servidor.
 */
export const getAllPosts = async (req, res, next) => {
    try {

        // Se delega al servicio la consulta de los posts.
        const resultado = await getAllPostsServices();
        
        // Retorna la lista de posts al cliente.
        res.status(200).json(resultado);

    } catch (error) {
        next(error);
    }
};


// ============================================================
// CONSULTAR UN POST POR ID
// ============================================================

/**
 * Obtiene los posts de un autors por el ID recibido en la URL.
 *
 * Ejemplo:
 * GET /posts/1
 *
 * Respuestas:
 * - 200: autor encontrado.
 * - 404: autor no encontrado.
 * - 500: error interno del servidor.
 */
export const getPostsById = async (req, res,next) => {
    try {

        // El ID se obtiene de los parámetros definidos en la ruta.
        const { id } = req.params;

        // Se utiliza usa una consulta en el servidor para obtener los autores por id
        const autor = await getAuthorByIdServices(id);
        
        // Si la consulta no retorna registros, el autor no existe.
        if (!autor) {
          return res.status(404).json({
            error: "Autor no encontrado"
        });
        }

        // Se delega al servicio la consulta del post por ID, solo si el autors existe
        const resultado = await getPostsByIdServices(id);

        // Si no existen registros, el post no fue encontrado.
        if (resultado.length===0) {
            return res.status(200).json({
                error: "Autor existe pero aun no tiene posts registrados"
            });
        }
        // Retorna los posts encontrados.
        res.status(200).json(resultado);

    } catch (error) {

       next(error);
    }
};

// ============================================================
// CREAR UN POST
// ============================================================

/**
 * Crea un nuevo post.
 *
 * Datos esperados en req.body:
 *
 * {
 *   "title": "Mi primer post",
 *   "author_id": 1,
 *   "published": true
 * }
 *
 * Flujo:
 * 1. Se reciben los datos del cliente.
 * 2. Se validan los datos.
 * 3. Se envían los datos al servicio.
 * 4. El servicio realiza la inserción en la base de datos.
 * 5. Se retorna el post creado.
 *
 * Respuestas:
 * - 201: post creado correctamente.
 * - 400: alguno de los datos no cumple las validaciones.
 * - 500: error interno del servidor.
 */
export const createPost = async (req, res, next) => {
    try {

        // Los datos del nuevo post se reciben desde el cuerpo de la petición.
        const { title, author_id, published } = req.body;


        // --------------------------------------------------------
        // VALIDACIÓN DEL TÍTULO
        // --------------------------------------------------------

        // Verifica que el título cumpla las reglas definidas
        // en la función validarTitle().
        const errorTitle = validarTitle(title);

        if (errorTitle) {
            return res.status(400).json({
                error: errorTitle
            });
        }


        // --------------------------------------------------------
        // VALIDACIÓN DEL AUTOR
        // --------------------------------------------------------

        // Verifica que author_id tenga un formato válido.
        const errorAutorId = validarAutorId(author_id);

        if (errorAutorId) {
            return res.status(400).json({
                error: errorAutorId
            });
        }

        // --------------------------------------------------------
        // VALIDACIÓN DEL ESTADO DE PUBLICACIÓN
        // --------------------------------------------------------

        // Verifica que published tenga un valor permitido.
        const errorPublic = validarPublished(published);

        if (errorPublic) {
            return res.status(400).json({
                error: errorPublic
            });
        }
        // --------------------------------------------------------
        // CREACIÓN DEL POST
        // --------------------------------------------------------

        // El controlador no realiza directamente la consulta SQL.
        // Envía los datos al servicio, que se encarga de la operación
        // correspondiente en la base de datos.
        const resultado = await createPostServices(
            title,
            author_id,
            published
        );

        // 201 indica que el recurso fue creado correctamente.
        res.status(201).json(resultado);

    } catch (error) {

       next(error);
    }
};

// ============================================================
// ACTUALIZAR UN POST
// ============================================================

/**
 * Actualiza un post existente.
 *
 * Datos esperados en req.body:
 *
 * {
 *   "id": 1,
 *   "title": "Título actualizado",
 *   "author_id": 2,
 *   "published": true
 * }
 *
 * Respuestas:
 * - 200: post actualizado correctamente.
 * - 400: alguno de los datos no cumple las validaciones.
 * - 404: post no encontrado.
 * - 500: error interno del servidor.
 */
export const updatePost = async (req, res, next) => {
    try {

        // El ID se obtiene de los parámetros definidos en la ruta.
        const { id } = req.params;

        // Los datos del post se reciben desde el cuerpo de la petición.
        const {title, author_id, published } = req.body;


        // --------------------------------------------------------
        // VALIDACIONES
        // --------------------------------------------------------

        // Valida el título antes de enviarlo al servicio.
        const errorTitle = validarTitle(title);

        if (errorTitle) {
            return res.status(400).json({
                error: errorTitle
            });
        }


        // Valida el ID del autor.
        const errorAutorId = validarAutorId(author_id);

        if (errorAutorId) {
            return res.status(400).json({
                error: errorAutorId
            });
        }

        // Valida el estado de publicación.
        const errorPublic = validarPublished(published);

        if (errorPublic) {
            return res.status(400).json({
                error: errorPublic
            });
        }


        // --------------------------------------------------------
        // ACTUALIZACIÓN DEL POST
        // --------------------------------------------------------

        // Se delega al servicio la operación de actualización.
        const resultado = await updatePostServices(
            id,
            title,
            author_id,
            published
        );


        // Si no se actualizó ningún registro, el post no existe.
        if (!resultado) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }


        // Retorna el post actualizado.
        res.status(200).json(resultado);

    } catch (error) {

        next(error);
    }
};


// ============================================================
// ELIMINAR UN POST
// ============================================================

/**
 * Elimina un post utilizando el ID recibido en la URL.
 *
 * Ejemplo:
 * DELETE /posts/1
 *
 * Respuestas:
 * - 200: post eliminado correctamente.
 * - 400: el ID no es válido.
 * - 404: post no encontrado.
 * - 500: error interno del servidor.
 */
export const deletePost = async (req, res, next) => {
    try {

        // El ID se obtiene de los parámetros de la ruta.
        const { id } = req.params;


        // --------------------------------------------------------
        // VALIDACIÓN DEL ID
        // --------------------------------------------------------

        // Verifica que el ID exista y que sea un valor numérico.
        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un número válido"
            });
        }


        // --------------------------------------------------------
        // ELIMINACIÓN DEL POST
        // --------------------------------------------------------

        // Se delega al servicio la operación DELETE.
        const resultado = await deletePostService(id);


        // Si no se eliminó ningún registro, el post no existe.
        if (!resultado) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }
        // Retorna los datos del post eliminado.
        res.status(200).json(resultado);

    } catch (error) {
       next(error);
    }
};