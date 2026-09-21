import { Router } from "express";
import { getAllPosts, createPost,getPostsById,updatePost,deletePost,getPostsByAuthorId } from "../controllers/postController.js";


//crear el enrutador
const postRouter = Router();


//Crear las rutas de los endpoints
postRouter.get("/",getAllPosts);
postRouter.get("/:id",getPostsById);
postRouter.get("/author/:authorId",getPostsByAuthorId);
postRouter.post("/",createPost);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);

//exportar 
export default postRouter;