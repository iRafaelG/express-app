/* Imports
 * Importamos el modulo Express y los almacenamos en una constante llamada "express"
 * Al ejecutar Express, nos devuelve un objeto que es el propio servidor, y lo almacenamos en una constante llamada "app"
 * Importamos en middleware Morgan y los almacenamos en una constante llamada "morgan"
 */

const express = require("express");
const app = express();
const morgan = require("morgan");

/*
 * Esta función nos da información sobre las peticiones al servidor, en esencia es lo que hace Morgan

function logger(req, res, next){
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
} 

 */

/* Settings
 * Configuramos el servidor indicandole el puerto que debe escuchar o el motor de plantillas a utilizar
 * Incluso podemos darle un nombre añadiendole una variable "AppName" con su valor correspondiente
 */
app.set("AppName", "Express App");
app.set("port", 4000);
app.set("view engine", "ejs");

/* Middlewares
 * Indicamos al servidor que middlewares debe usar, en este caso JSON y Morgan
 * JSON viene en incorporado con Express, asi que, no debemos importar ningun modulo adicional, solo usarlo
 * A Morgan debemos de indicarle un modo de operar, es este caso "dev"
 * "logger" seria la funcion middleware que hemos creado anteriormente que se "parece" a Morgan
 */

app.use(express.json());
app.use(morgan("combined"));
// app.use(logger);

/* Routes
 * Usando los verbos del protocolo HTTP podemos definir como funcionan las rutas
 * A traves de un URI ("/", "/user"...) y una funcion (handle) que las maneje
 * Mediante el verbo GET, le indicamos con que funcion debe manejar la ruta inicial por ejemplo
 * La propiedad "all" nos permite indicar que sucede para todas las rutas que tengan la misma URI

app.all('/user', (req, res, next) => {
    console.log('Por aquí pasó');
    next();
});

 */

app.get("/", (req, res) => {
  let data = [
    { name: "Vero" },
    { name: "Rafael" },
    { name: "Javier" },
    { name: "Miguel" }
  ];
  res.render("index.ejs", { data });
});

app.get("/user", (req, res) => {
  res.json({
    username: "Cameron",
    lastname: "Howe"
  });
});

app.post("/user/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("Post request received");
});

app.put("/user/:id", (req, res) => {
  console.log(req.body);
  res.send(`User ${req.params.id} has been updated!`);
});

app.delete("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} has been deleted!`);
});

/* Static Files
 * Le indicamos al servidor donde se encuentra la carpeta con los archivos estaticos o publicos
 */

app.use(express.static("public"));

/* 
 * Ponemos al servidor a escuchar por el puerto que hemos configurado antes
 */

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
  // console.log(app.get("AppName"));
});

/* Antes de Express se arrancaba un servidor http de este modo

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(3000, () => console.log('Server on port 3000'));

*/
