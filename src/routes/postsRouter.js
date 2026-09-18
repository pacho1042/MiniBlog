import { Router } from "express";
import { getAllPosts, getPostsById,createPost,updatePost,deletePost } from "../controllers/postController.js";


//crear el enrutador
const postRouter = Router();


//Crear las rutas de los endpoints
postRouter.get("/",getAllPosts);
postRouter.get("/:id",getPostsById);
postRouter.post("/",createPost);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);

//exportar 
export default postRouter;