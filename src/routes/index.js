//archivo para mapear todas las rutas
//Importamos el enrutador 
import { Router } from "express";
import authorsRouter from "./authorsRouter.js";
import postRouter from "./postsRouter.js";


//Crear el enrutador
const router = Router();

//Creamos el indice de las rutas a usar en los endpoints
router.use("/authors", authorsRouter); 
router.use("/posts",postRouter); 


//se exportar la ruta 
export default router;