import { Router } from "express";
import { createAuthors, deleteAuthors, getAllAuthors, getAuthorById, updateAuthors } from "../controllers/authorsController.js";

//crear el enrutador
const authorsRouter = Router();

//Crear las rutas de los endpoints
authorsRouter.get("/",getAllAuthors); 
authorsRouter.get("/:id",getAuthorById); 
authorsRouter.post("/",createAuthors); 
authorsRouter.put("/:id",updateAuthors); 
authorsRouter.delete("/:id",deleteAuthors); 



//exportar las rutas
export default authorsRouter;
