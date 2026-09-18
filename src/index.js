// Carga las variables de entorno definidas en el archivo .env
// y las hace disponibles en process.env (DB_HOST, DB_USER, PORT, etc.)
import "dotenv/config";

// Importa la instancia de Express ya configurada con middlewares y rutas
import app from "./app.js";

// Puerto en el que se levanta el servidor.
// Toma el valor de la variable de entorno PORT y, si no está definida,
// usa 3000 como valor por defecto.
const PORT = process.env.PORT || 3000;

// Levanta el servidor y lo deja escuchando peticiones en el puerto indicado.
// El callback se ejecuta una sola vez, cuando el servidor ya está listo.
app.listen(PORT, () => {
    console.log(`Servidor express en https://localhost:${PORT}`)
});