# MiniBlog

API REST desarrollada con **Node.js, Express y PostgreSQL** como proyecto práctico para fortalecer conocimientos relacionados con el desarrollo backend.

El proyecto permite gestionar **autores y publicaciones (posts)** mediante diferentes endpoints HTTP y utiliza PostgreSQL como sistema de persistencia de datos.

El proyecto fue desarrollado con fines de aprendizaje y práctica de los siguientes conceptos:

* Creación y consumo de endpoints REST.
* Manejo de métodos HTTP: `GET`, `POST`, `PUT` y `DELETE`.
* Separación de responsabilidades mediante rutas, controladores y servicios.
* Conexión a PostgreSQL utilizando `pg` y un **Pool de conexiones**.
* Consultas SQL parametrizadas.
* Validación de datos recibidos mediante las peticiones.
* Manejo de errores HTTP.
* Middleware en Express.
* Pruebas automatizadas de endpoints.
* Documentación de la API mediante OpenAPI.
* Despliegue de una API en Railway.
* Manejo de variables de entorno.

---

## 1. Tecnologías utilizadas

| Tecnología | Uso                                         |
| ---------- | ------------------------------------------- |
| Node.js    | Entorno de ejecución de JavaScript          |
| Express    | Framework para construir la API REST        |
| PostgreSQL | Sistema de gestión de base de datos         |
| `pg`       | Cliente de PostgreSQL para Node.js          |
| Jest       | Ejecución de pruebas                        |
| Supertest  | Pruebas de endpoints HTTP                   |
| OpenAPI    | Documentación de la API                     |
| Railway    | Despliegue de la aplicación y base de datos |
| Git        | Control de versiones                        |
| GitHub     | Repositorio remoto                          |

---

## 2. Objetivo del proyecto

El objetivo principal de MiniBlog es practicar el desarrollo de una API backend utilizando Node.js y Express, integrándola con una base de datos PostgreSQL.

El proyecto permite practicar un flujo completo de desarrollo:

```text
Cliente
   ↓
Endpoint HTTP
   ↓
Ruta
   ↓
Controlador
   ↓
Servicio
   ↓
Pool de PostgreSQL
   ↓
Base de datos
```

Además, se practicó el proceso completo de publicación de una aplicación backend:

```text
Desarrollo local
      ↓
Git
      ↓
GitHub
      ↓
Railway
      ↓
API desplegada
```

---

# 3. Funcionalidades

La API permite realizar operaciones relacionadas con:

### Autores

* Obtener todos los autores.
* Obtener un autor por ID.
* Crear un autor.
* Actualizar un autor.
* Eliminar un autor.

### Posts

* Obtener todos los posts.
* Obtener un post por ID.
* Obtener los posts pertenecientes a un autor.
* Crear un post.
* Actualizar un post.
* Eliminar un post.

También se implementaron validaciones y manejo de diferentes respuestas HTTP, por ejemplo:

* `200 OK`
* `201 Created`
* `400 Bad Request`
* `404 Not Found`
* `409 Conflict`
* `500 Internal Server Error`

---

# 4. Estructura del proyecto

La estructura principal del proyecto es:

```text
MiniBlog/
│
├── src/
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── postController.js
│   │
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   ├── authorServices.js
│   │   └── postServices.js
│   │
│   ├── middleware/
|   |   └── errorHandler.js 
│   │
│   ├── db/
│   │   └── config.js
|   |   └── seed.js
|   |   └── setup.js    
│   │
│   └── app.js
│
├── utils/
│   └── validators.js
│
├── docs/
│   └── openapi.yaml
│
|──tests/
|  └── authors.test.js
|  └── posts.test.js
|  └── validators.test.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
└── vitest.config.js
```

---

# 5. Requisitos previos

Para ejecutar el proyecto localmente se requiere tener instalado:

* Node.js
* npm
* PostgreSQL
* Git

Se recomienda verificar las instalaciones mediante:

```bash
node --version
npm --version
psql --version
git --version
```

---

# 6. Clonar el proyecto

Desde una terminal, clonar el repositorio de GitHub:

```bash
git clone https://github.com/pacho1042/MiniBlog.git
```

Ingresar a la carpeta:

```bash
cd MiniBlog
```

> Reemplazar `https://github.com/pacho1042/MiniBlog.git` por la URL mencionada correspondiente al repositorio de GitHub.

---

# 7. Instalar las dependencias

Una vez ubicado dentro de la carpeta del proyecto:

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

---

# 8. Configuración de PostgreSQL

El proyecto utiliza PostgreSQL como base de datos.

Crear una base de datos llamada:

```text
miniBlog
```

Desde `psql` se puede utilizar:

```sql
CREATE DATABASE miniBlog;
```

Luego conectarse a la base:

```sql
\c miniBlog
```

## 9. Crear y poblar la base de datos

El proyecto cuenta con dos archivos SQL para preparar la base de datos:

* `setup.sql`: contiene la estructura de la base de datos, incluyendo la creación de las tablas y relaciones.
* `seed.sql`: contiene datos iniciales para poblar las tablas y permitir realizar pruebas con información de ejemplo.

### 9.1 Crear las tablas

Una vez creada la base de datos `miniBlog`, ejecutar el archivo `setup.sql`:

```bash
psql -U postgres -d miniBlog -f setup.sql
```

Este comando crea la estructura necesaria para el funcionamiento de la aplicación.

Las principales tablas utilizadas son:

```text
authors
posts
```

La tabla `posts` mantiene una relación con `authors` mediante:

```text
posts.author_id → authors.id
```

### 9.2 Poblar la base de datos

Después de crear las tablas, ejecutar el archivo `seed.sql`:

```bash
psql -U postgres -d miniBlog -f seed.sql
```

Este archivo inserta datos iniciales en la base de datos, permitiendo contar con información para probar los diferentes endpoints de la API.

El orden de ejecución es importante:

```text
1. Crear base de datos
        ↓
2. Ejecutar setup.sql
        ↓
3. Ejecutar seed.sql
        ↓
4. Iniciar la aplicación
        ↓
5. Probar los endpoints
```

Por lo tanto, para preparar completamente la base de datos se deben ejecutar:

```bash
psql -U postgres -d miniBlog -f setup.sql

psql -U postgres -d miniBlog -f seed.sql
```

> `setup.sql` prepara la estructura de la base de datos, mientras que `seed.sql` proporciona los datos iniciales necesarios para realizar las pruebas de la aplicación.


# 10. Configuración de la conexión a PostgreSQL

La conexión a PostgreSQL se realiza desde:

```text
src/db/config.js
```

El proyecto utiliza un **Pool de conexiones**.

El concepto de Pool permite administrar un conjunto de conexiones reutilizables hacia PostgreSQL en lugar de crear una nueva conexión para cada consulta.

De esta manera, los servicios pueden ejecutar consultas utilizando el Pool.

Ejemplo conceptual de manera local:

```javascript
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool;
```
Ejemplo conceptual de manera de servidor externo railway:

```javascript
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({

  connectionString:process.env.DATABASE_URL,
});

export default pool;
```


Las variables utilizadas deben configurarse mediante variables de entorno.

---

# 11. Variables de entorno

Para el entorno local se debe crear un archivo:

```text
.env
```

Por ejemplo conexion local:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
DB_NAME=miniBlog

```
Por ejemplo conexion servidor externo railway:

```env
PORT=3000

DATABASE_URL=
```


Los valores reales de las credenciales deben ser configurados por cada usuario.

### Importante

El archivo `.env` no debe subirse a GitHub cuando contiene credenciales reales.

El proyecto debe incluir `.env` dentro de `.gitignore`:

```gitignore
.env
node_modules/
```

---

# 12. Ejecución local

Una vez creada la base de datos y configuradas las variables de entorno, ejecutar:

```bash
npm start
```

Si el proyecto cuenta con un script de desarrollo, también puede utilizarse:

```bash
npm run dev
```

El servidor estará disponible normalmente en:

```text
http://localhost:3000
```

---

# 13. Arquitectura de la aplicación

El proyecto utiliza una separación de responsabilidades.

## Routes

Las rutas reciben las peticiones HTTP y las relacionan con los controladores.

Ejemplo:

```text
GET /api/authors
GET /api/authors/:id
POST /api/authors
PUT /api/authors
DELETE /api/authors/:id
```

## Controllers

Los controladores reciben la petición, validan los datos necesarios, llaman a los servicios y construyen la respuesta HTTP.

## Services

Los servicios contienen la lógica relacionada con las consultas a la base de datos.

Por ejemplo:

```javascript
const resultado = await pool.query(
    "SELECT * FROM authors WHERE id = $1",
    [id]
);
```

## Database

El módulo de base de datos centraliza la configuración del Pool de PostgreSQL.

Esta separación permite evitar que las consultas SQL estén mezcladas directamente con las rutas.

---

# 14. Endpoints principales

## Autores

### Obtener todos los autores

```http
GET /authors
```

Respuesta esperada:

```json
[
    {
        "id": 1,
        "name": "Gabriel García Márquez",
        "email": "gabriel@example.com"
    }
]
```

### Obtener un autor

```http
GET /authors/:id
```

Ejemplo:

```http
GET /authors/1
```

### Crear un autor

```http
POST /authors
```

Ejemplo:

```json
{
    "name": "Gabriel García Márquez",
    "email": "gabriel@example.com",
    "bio": "Escritor colombiano."
}
```

### Actualizar un autor

```http
PUT /authors
```

### Eliminar un autor

```http
DELETE /authors/:id
```

---

# 15. Posts

### Obtener todos los posts

```http
GET /posts
```

### Obtener un post

```http
GET /posts/:id
```
### Obtener todos los post de un autor

```http
GET /posts/author/:authorId 
```

### Crear un post

```http
POST /posts
```

Ejemplo:

```json
{
    "title": "Mi primer post",
    "author_id": 1,
    "published": true
}
```

### Actualizar un post

```http
PUT /posts
```

### Eliminar un post

```http
DELETE /posts/:id
```

---

# 16. Consulta de posts por autor

Una de las prácticas realizadas en el proyecto consiste en consultar los posts asociados a un autor.

El flujo utilizado es:

```text
ID del autor
     ↓
Validar que el autor exista
     ↓
Consultar posts asociados
     ↓
Retornar los resultados
```

Se contemplan tres situaciones:

### Autor existente con posts

```http
200 OK
```

Retorna una lista de publicaciones.

### Autor existente sin posts

```http
200 OK
```

Retorna:

```json
[]
```

### Autor inexistente

```http
404 Not Found
```

Retorna:

```json
{
    "error": "Autor no encontrado"
}
```

Esta funcionalidad permitió practicar consultas SQL, relaciones entre tablas y manejo de diferentes escenarios de respuesta.

---

# 17. Validaciones

El proyecto cuenta con funciones de validación para controlar los datos recibidos mediante los endpoints.

Entre las validaciones realizadas se encuentran:

* Nombre del autor.
* Email.
* Biografía.
* ID del autor.
* Título del post.
* Estado `published`.

Por ejemplo, el email es validado antes de realizar la operación sobre la base de datos.

Esto permite evitar que datos inválidos lleguen directamente a las consultas SQL.

---

# 18. Manejo de errores

La API contempla diferentes escenarios de error.

Algunos ejemplos:

### Datos inválidos

```http
400 Bad Request
```

### Recurso inexistente

```http
404 Not Found
```

Ejemplo:

```json
{
    "error": "Autor no encontrado"
}
```

### Email duplicado

```http
409 Conflict
```

Ejemplo:

```json
{
    "error": "El email ya está en uso"
}
```


### Error interno

```http
500 Internal Server Error
```

---

# 19. Middleware

Durante el desarrollo también se practicó el uso de middleware de Express.

Entre ellos:

* Middleware general para errores.

El middleware permite ejecutar lógica común durante el procesamiento de las solicitudes sin repetirla en cada endpoint.

---

# 20. Pruebas

El proyecto incluye pruebas para verificar el comportamiento de los endpoints.

Las pruebas permiten comprobar escenarios como:

* Obtener correctamente los posts de un autor.
* Retornar una lista vacía cuando un autor no tiene publicaciones.
* Retornar `404` cuando el autor no existe.
* Validar respuestas HTTP.
* Validar el contenido de las respuestas.

Ejemplo:

```javascript
test("devuelve una lista vacía si el autor no tiene posts", async () => {
    const response = await request(app).get("/posts/2");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
});
```

Las pruebas fueron desarrolladas como parte del proceso de aprendizaje de pruebas automatizadas de APIs.

Para ejecutar las pruebas:

```bash
npm test
```

---

# 21. Documentación con OpenAPI

La API se documentó utilizando **OpenAPI**.

El archivo principal se encuentra en:

```text
docs/openapi.yaml
```

La documentación describe:

* Endpoints.
* Métodos HTTP.
* Parámetros.
* Cuerpos de las peticiones.
* Respuestas.
* Códigos HTTP.
* Esquemas de datos.
* Ejemplos de solicitudes y respuestas.
* Errores posibles.

Esto permite contar con una referencia formal de cómo consumir la API.

---

# 22. Control de versiones con Git

El proyecto utiliza Git para el control de versiones.

Flujo utilizado durante el desarrollo:

```bash
git status
git add .
git commit -m "Descripción del cambio"
git push
```

Para obtener el proyecto:

```bash
git clone https://github.com/pacho1042/MiniBlog.git
```

El repositorio remoto se encuentra alojado en GitHub.

---

# 23. Despliegue en Railway

El proyecto fue desplegado utilizando Railway.

Railway permite desplegar aplicaciones Node.js y conectarlas con PostgreSQL mediante variables de entorno. La plataforma también permite utilizar variables como `DATABASE_URL` y otras variables de conexión proporcionadas por el servicio PostgreSQL.

El proceso utilizado consiste conceptualmente en:

```text
GitHub
   ↓
Railway
   ↓
Servicio Node.js / Express
   ↓
PostgreSQL
```

Railway puede desplegar directamente un repositorio de GitHub y detectar una aplicación Node.js. También permite configurar las variables de entorno desde el servicio desplegado.

---

# 24. Configuración de variables en Railway

Las credenciales y datos de conexión no deben escribirse directamente en el código.

En Railway se configuran como variables de entorno.

Por ejemplo:

```text
DATABASE_URL
```


Railway proporciona estas variables al servicio PostgreSQL y permite utilizarlas desde el servicio de la aplicación.

Desde Node.js se pueden obtener mediante:

```javascript
process.env.DATABASE_URL
```

Las variables de entorno permiten mantener separada la configuración del código fuente y evitar publicar credenciales en el repositorio.

---

# 25. API desplegada

La aplicación se encuentra desplegada en Railway:

**MiniBlog API**

[Abrir API desplegada en Railway](https://miniblog-production-b6e2.up.railway.app/?utm_source=chatgpt.com)

URL base:

```text
https://miniblog-production-b6e2.up.railway.app/
```

Los endpoints se construyen a partir de esta URL base.

Por ejemplo:

```text
https://miniblog-production-b6e2.up.railway.app/api/authors
```

y:

```text
https://miniblog-production-b6e2.up.railway.app/api/posts
```

---

# 26. Reproducir el despliegue

Para realizar nuevamente el proceso de despliegue desde Railway se puede:

1. Tener el proyecto publicado en GitHub.
2. Crear un proyecto en Railway.
3. Seleccionar el repositorio de GitHub.
4. Crear o asociar un servicio PostgreSQL.
5. Configurar las variables de entorno.
6. Realizar el despliegue.
7. Generar un dominio público.
8. Verificar los logs del servicio.
9. Probar los endpoints desplegados.


---

# 27. Flujo completo para poner el proyecto en marcha de manera local

El procedimiento completo para una nueva instalación es:

```text
1. Clonar repositorio
        ↓
2. Entrar a MiniBlog
        ↓
3. npm install
        ↓
4. Crear base de datos PostgreSQL
        ↓
5. Ejecutar setup.sql
        ↓
6. Configurar variables de entorno
        ↓
7. Iniciar servidor
        ↓
8. Probar endpoints
        ↓
9. Ejecutar pruebas
        ↓
10. Consultar documentación OpenAPI
```

Comandos principales:

```bash
git clone https://github.com/pacho1042/MiniBlog.git

cd MiniBlog

npm install

npm start
```

Para ejecutar las pruebas:

```bash
npm test
```

---

# 28. Aprendizajes obtenidos

El desarrollo de MiniBlog permitió practicar un flujo completo de desarrollo backend, desde la creación de la aplicación hasta su publicación.

Los principales conceptos practicados fueron:

### Backend

* Creación de un servidor utilizando Node.js y Express.
* Creación de endpoints REST.
* Uso de métodos HTTP.
* Manejo de parámetros y cuerpos de las peticiones.
* Creación de middleware.

### Base de datos

* Creación de una base de datos PostgreSQL.
* Creación de tablas y relaciones.
* Consultas SQL.
* Uso de `JOIN`.
* Uso de consultas parametrizadas.
* Conexión desde Node.js.
* Uso de Pool de conexiones.

### Arquitectura

* Separación entre rutas.
* Controladores.
* Servicios.
* Acceso a base de datos.
* Validadores.

### Calidad

* Validación de información.
* Manejo de errores.
* Manejo de códigos de estado HTTP.
* Pruebas automatizadas.

### Documentación

* Documentación de endpoints mediante OpenAPI.
* Definición de esquemas.
* Documentación de parámetros.
* Documentación de respuestas y errores.

### Despliegue

* Uso de Git y GitHub.
* Integración de GitHub con Railway.
* Configuración de variables de entorno.
* Despliegue de una API Node.js.
* Integración con PostgreSQL.
* Verificación de una API mediante una URL pública.

---

# 29. Conclusión

MiniBlog fue desarrollado como un proyecto práctico para integrar diferentes conceptos del desarrollo backend.

El proyecto permitió recorrer el proceso completo:

```text
Diseño
  ↓
Desarrollo
  ↓
Base de datos
  ↓
Endpoints
  ↓
Validaciones
  ↓
Pruebas
  ↓
Documentación
  ↓
Git/GitHub
  ↓
Despliegue
  ↓
API disponible públicamente
```

De esta manera, el proyecto no se limita a la creación de endpoints, sino que permite practicar un flujo completo de construcción, prueba, documentación y despliegue de una API REST conectada a PostgreSQL.
