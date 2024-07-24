const express = require('express');
const app = express();
const path = require('path');

//funcion estatica
app.use(express.static(path.resolve(__dirname, './public')));

//levantar nuestro servidor
const port= process.env.PORT || 3000;
app.listen(port,()=>console.log("Servidor corriendo en el puerto" + port));

//app.listen(3000,()=>{
  //  console.log('servidor corriendo')
//})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'src/views/index.html'))
})

app.get('/servicios', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/servicios.html'))
})

app.get('/novedades', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/novedades.html'))
})

app.get('/documentos', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/documentos.html'))
})

app.get('/registro', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/registro.html'))
})

app.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/login.html'))
})

app.get('/ubicacion', (req, res)=>{
  res.sendFile(path.join(__dirname, 'src/views/ubicacion.html'))
})
