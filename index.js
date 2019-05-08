//Importar libreria
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors')
//Inicializar libreria
var app = express();
app.use(cors())
app.use(bodyparser.json());
app.use('/', require('./routes/_index.js'))

var port = 3000
//Inicializa el servidor
app.listen(port, ()=> {
    console.log(`Mi API se esta ejecutando en http://localhost:${port}/tasks`);        
})