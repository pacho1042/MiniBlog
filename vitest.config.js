import {defineConfig} from "vitest/config"; 

//la presente configuración hace parte de la sugerencia del profesor para que se puedan
//ejecutar las pruebas de los endpoints donde se usa una misma base de datos
export default defineConfig({

    test: {
        globals: true,
        environment: "node",
        fileParallelism: false
    },

});