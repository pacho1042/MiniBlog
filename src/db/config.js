import { Pool } from "pg";

//creamos el objeto para las conexiones
const pool = new Pool({
   /* Por separado para una conexión local sin el uso del servidor externo 
   host:        process.env.DB_HOST,
   port:        process.env.DB_PORT,
   database :   process.env.DB_NAME,
   user:        process.env.DB_USER,
   password:    process.env.DB_PASSWORD
   */
  /*Conexión a servidor externo*/
  connectionString:process.env.DATABASE_URL,

});

export default pool;