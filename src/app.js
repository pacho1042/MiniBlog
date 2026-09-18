// Framework principal para crear el servidor y manejar rutas HTTP
import express from "express";

// Router central que agrupa todas las rutas de la aplicación (authors, posts, etc.)
import router from "./routes/index.js";

// Middleware que expone la interfaz visual de Swagger para explorar la API
import swaggerUi from "swagger-ui-express";

// Utilidad para leer y parsear archivos YAML (la especificación OpenAPI)
import YAML from "yamljs";

//Middleware para el manejo centralizado del error 500 y ruta no encontrada
import {errorHandler, notFoundHandler} from "../src/middlewares/errorHandler.js";

// Crea la instancia de la aplicación Express
const app = express();

// Carga la especificación OpenAPI desde el archivo YAML.
// Este documento describe todos los endpoints, parámetros y respuestas de la API.
const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

// Middleware que parsea el body de las peticiones en formato JSON
// y lo deja disponible en req.body. Sin esto, req.body llegaría undefined.
app.use(express.json());

// Monta la documentación interactiva de Swagger en la ruta /api-docs.
// swaggerUi.serve entrega los archivos estáticos de la interfaz,
// swaggerUi.setup la configura con la especificación cargada arriba.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Monta el router principal con todas las rutas de la API
app.use(router);

// Manejador centralizado de errores del servidor.
app.use(errorHandler);

// Manejador de rutas no encontradas. 404
app.use(notFoundHandler);


// Se exporta la app (sin llamar a listen) para que pueda ser usada
// tanto por el servidor real como por los tests con supertest.
export default app;