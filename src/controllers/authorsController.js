import { validarAutorId, validarBio, validarEmail, validarName } from "../../utils/validators.js";
import { getAllAuthorsServices, getAuthorByIdServices,createAuthorsServices,deleteAuthorsServices,updateAuthorsServices } from "../services/authorsServices.js";

/**
 * Obtiene todos los autores registrados en la base de datos.
 *
 * Respuesta exitosa:
 * - 200: retorna la lista de autores.
 *
 * Error:
 * - 500: ocurre un error al consultar la base de datos.
 */
export const getAllAuthors = async (req, res) => {
    try {
        // Consulta todos los autores y los ordena por fecha de creación en el servicio
        const resultado = await getAllAuthorsServices(); 
     
        res.status(200).json(resultado);

    } catch (error) {

        // Se registra el error en consola para facilitar su diagnóstico.
        console.error("Error Obteniendo Autores", error);

        // Error interno al realizar la consulta.
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

/**
 * Obtiene un autor específico utilizando el ID recibido en la URL.
 *
 * Ejemplo:
 * GET /api/authors/1
 *
 * Respuestas:
 * - 200: autor encontrado.
 * - 400: el ID no tiene un formato válido.
 * - 404: no existe un autor con ese ID.
 * - 500: error interno del servidor.
 */
export const getAuthorById = async (req, res) => {
    try {

        // El ID se obtiene directamente de los parámetros de la ruta.
        const { id } = req.params;

        // Se valida que el ID tenga un formato válido antes de consultar la BD.
        const errorAutorId = validarAutorId(id);

        if (errorAutorId) {
            return res.status(400).json({
                error: errorAutorId
            });
        }
        // Se utiliza usa una consulta en el servidor para obtener los autores por id
        const resultado = await getAuthorByIdServices(id);

        // Si la consulta no retorna registros, el autor no existe.
        if (!resultado) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        // Retorna el autor encontrado.
        res.status(200).json(resultado);

    } catch (error) {

        console.error("Error Obteniendo Autor", error);

        res.status(500).json({
           error: "Error interno del servidor"
        });
    }
};


/**
 * Crea un nuevo autor en la base de datos.
 *
 * Datos esperados en req.body:
 * {
 *   "name": "Juan Pérez",
 *   "email": "juan@gmail.com",
 *   "bio": "Desarrollador"
 * }
 *
 * Respuestas:
 * - 201: autor creado correctamente.
 * - 400: alguno de los datos no cumple las validaciones.
 * - 409: el email ya se encuentra registrado.
 * - 500: error interno del servidor.
 */
export const createAuthors = async (req, res) => {
    try {

        // Los datos del nuevo autor se obtienen del cuerpo de la petición.
        const { name, email, bio } = req.body;

        // Validación del nombre: verifica que cumpla las reglas definidas.
        const errorName = validarName(name);

        if (errorName) {
            return res.status(400).json({
                error: errorName
            });
        }
        // Validación del email: verifica que sea obligatorio
        // y que tenga una estructura válida de correo electrónico.
        const errorEmail = validarEmail(email);

        if (errorEmail) {
            return res.status(400).json({
                error: errorEmail
            });
        }

        // La biografía puede ser opcional, pero si se envía
        // debe cumplir las reglas establecidas.
        const errorBio = validarBio(bio);

        if (errorBio) {
            return res.status(400).json({
                error: errorBio
            });
        }

        // Inserta el nuevo autor utilizando el servicio
        const resultado =  await createAuthorsServices(name,email,bio);

        // 201 indica que el recurso fue creado correctamente.
        res.status(201).json(resultado);

    } catch (error) {

        console.error("Error Creando Autor", error);

        // PostgreSQL utiliza el código 23505 para violaciones
        // de restricciones UNIQUE, como un email duplicado.
        if (error.code === "23505" && error.constraint.includes("email")) {
            return res.status(409).json({
                error: "El email ya está en uso"
            });
        }

        // Error inesperado durante la creación del autor.
        res.status(500).json({
           error: "Error interno del servidor"
        });
    }
};

/**
 * Elimina un autor utilizando el ID recibido en la URL.
 *
 * Ejemplo:
 * DELETE /api/authors/1
 *
 * Respuestas:
 * - 200: autor eliminado.
 * - 400: ID inválido.
 * - 404: autor no encontrado.
 * - 500: error interno del servidor.
 */
export const deleteAuthors = async (req, res) => {
    try {

        // El ID se obtiene de los parámetros definidos en la ruta.
        const { id } = req.params;

        // Se valida el ID antes de ejecutar la operación DELETE.
        const errorAutorId = validarAutorId(id);

        if (errorAutorId) {
            return res.status(400).json({
                error: errorAutorId
            });
        }

        // RETURNING * permite obtener el registro que acaba de eliminarse a través de services
        const resultado = await deleteAuthorsServices(id);

        // Si no se eliminó ningún registro, el autor no existía.
        if (!resultado) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        // Retorna los datos del autor eliminado.
        res.status(200).json(resultado);

    } catch (error) {

        console.error("Error Eliminando Autor", error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
};

/**
 * Actualiza los datos de un autor existente.
 *
 * Los datos se reciben mediante req.body:
 * {
 *   "id": 1,
 *   "name": "Juan Pérez",
 *   "email": "juan@gmail.com",
 *   "bio": "Nueva biografía"
 * }
 *
 * Respuestas:
 * - 200: autor actualizado correctamente.
 * - 400: alguno de los datos no cumple las validaciones.
 * - 404: autor no encontrado.
 * - 409: el nuevo email ya está registrado.
 * - 500: error interno del servidor.
 */
export const updateAuthors = async (req, res) => {
    try {

        // El ID se obtiene de los parámetros definidos en la ruta.
        const { id } = req.params;

        // Los datos del autor se reciben en el cuerpo de la petición.
        const {name, email, bio } = req.body;

        // Primero se valida el ID para garantizar que tenga un formato válido.
        const errorAutorId = validarAutorId(id);

        if (errorAutorId) {
            return res.status(400).json({
                error: errorAutorId
            });
        }

        // Validación del nombre.
        const errorName = validarName(name);

        if (errorName) {
            return res.status(400).json({
                error: errorName
            });
        }

        // Validación de la estructura y contenido del email.
        const errorEmail = validarEmail(email);

        if (errorEmail) {
            return res.status(400).json({
                error: errorEmail
            });
        }

        // Validación de la biografía.
        const errorBio = validarBio(bio);

        if (errorBio) {
            return res.status(400).json({
                error: errorBio
            });
        }

        // Actualiza el autor utilizando una consulta parametrizada.
        const resultado = await updateAuthorsServices (id,name, email, bio);

        // Si no se actualizó ningún registro, el autor no existe.
        if (!resultado) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        // Retorna los datos actualizados.
        res.status(200).json(resultado);

    } catch (error) {

        console.error("Error Actualizando Autor", error);

        // PostgreSQL utiliza 23505 cuando se intenta utilizar
        // un email que ya pertenece a otro autor.
        if (error.code === "23505" && error.constraint.includes("email")) {
            return res.status(409).json({
                error: "El email ya está en uso"
            });
        }

        res.status(500).json({
           error: "Error interno del servidor"
        });
    }
};