//Importar libreria
var express = require('express');
//Inicializar libreria
var app = express.Router();

// Filtro de peticiones
// app.use(function (req, res, next) {
//     let url = req.url
//     let token = req.headers['token']

//     dbtest.execute()

//     //Realiza 
//     if (token || url === '/login/'){
//         next()
//     } else {
//         res.status(401).send(
//             {success:false, 
//             message:'No autorizado'})
//     }
//     next()
// })

app.use('/', require('./auth'))
app.use('/', require('./tasks'))
app.use('/', require('./teams'))

app.use(function (req, res, next) {
    res.status(404).send({
        success:false, 
        message: 'RUTA NO ENCONTRADA'})
})


module.exports = app