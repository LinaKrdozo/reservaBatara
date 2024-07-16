const express = require("express");
const session = require("express-session");
const cookies = require('cookie-parser');
const path = require("path");
const methodOverride =  require('method-override');
const indexRouter=require('./src/routes/index.routes')


const app = express();

const userLoggedMid = require('./src/middlewares/userLoggedMid');

app.use(session({
    secret: "shhh, It's a secret",
    resave: false,
    saveUninitialized:false,
}));

const port = 3000;

app.use(cookies());

app.use(userLoggedMid);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method')); 

app.use('/', indexRouter);

app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));