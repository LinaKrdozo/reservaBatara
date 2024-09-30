const express = require('express');
const session = require("express-session");
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride =  require('method-override');
const mainRouter = require('./src/routes/index.routes');
const vistasInfoRouter = require('./src/routes/vistasInfo.routes')

const app = express();

const userloggedMid = require('./src/middlewares/userLoggedMid')

app.use(session({
  secret: "shhh, It's a secret",
  resave: false,
  saveUninitialized:false,
}));

app.use(cookies());

app.use(userloggedMid);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method')); 

app.use('/', mainRouter);
app.use('/', vistasInfoRouter)

app.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/login.html'))
})

/*app.get('/ubicacion', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/ubicacion.html'))
})*/

//levantar nuestro servidor
const port= process.env.PORT || 3000;
app.listen(port,()=>console.log("Servidor corriendo en el puerto " + port));  