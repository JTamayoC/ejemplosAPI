//Importar libreria
var express = require('express');
var jwt = require('jsonwebtoken');

var private_key = "h0l4MuNd0"
//Inicializar libreria
var app = express.Router();

app.post('/login/', (req, res) => {
    let body = req.body
    if (body.user && body.password) {
        if (body.user == '001' && body.password == 'admin') {
            //El usuario esta autorizado
            let user = {
                name: "JTamayo",
                role:"admin",
                cc:"1234567890",
                phone:"3216549870"
            }
            let token = jwt.sign(user, private_key, {expiresIn:30})
            res.status(200).send(
                {
                    success: true,
                    message: 'OK',
                    date: Date.now(),
                    info:token
                }
            )
        }else{
            //El usuario no esta autorizado
            res.status(401).send(
                {success:false, 
                message:'No autorizado'})
        }
    } else {
        res.status(400).send({
            success:false, 
            message: 'Bad request'})
    }
})

app.get('/valid/', (req,res)=>{
    let token = req.headers.token

    
    if (token) {
        //Descifrar
        try {
            let temp = jwt.verify(token, private_key)
            res.status(200).send(
                {
                    success: true,
                    message: 'Valido',
                    info:temp
                })
        } catch (error) {
            res.status(400).send(
                {success:false, 
                message:'No valid token'})
        }
        
    } else {
        //No token provider
        res.status(401).send(
            {success:false, 
            message:'No autorizado'})
    }
})

module.exports = app