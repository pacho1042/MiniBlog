// Middleware centralizado de manejo de errores 500.
export const errorHandler = (err, req, res, next) => {

    // Se registra el error completo para facilitar el diagnóstico en consola.
    console.error("Error en la aplicación:", err);

    // PostgreSQL utiliza el código 23505 para violaciones
        // de restricciones UNIQUE, como un email duplicado.
        if (err.code === "23505" && err.constraint.includes("email")) {
            return res.status(409).json({
                error: "El email ya está en uso"
            });
        }


    // Cualquier otro error no contemplado se trata como error interno.
    res.status(500).json({
        error: "Error interno del servidor"
    });
};

// Middleware para rutas inexistentes. Se monta después de todas las rutas.
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada"
    });
};