
import express from "express";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";  


const app = express();

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

//middleware
app.use(express.json());

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));


//rutas importadas
app.use(router);


export default app;