//Importar libreria
var express = require('express');
//Inicializar libreria
var app = express();
//Arreglo de tareas
let teams=[];

//Obtener tareas basado enla ruta /true or false/
app.get('/teams/', function(req, res) {
    //console.log('Estoy en el get');    
    //res.status(404).send('<h1>API not found</h1>')
    //let query = req.query
    //let mytask = teams.filter(element => element.status.toString() == query.status)
    res.status(200).send(teams)

})

//Obtener una sola tarea basado enla ruta /filter/id
app.get('/teams/filter/:name?', function(req, res) {
    console.log(req.params);
    let name = req.params.name
    if (name) {
        let myteams = teams.filter(element => (element.name).includes(name))
        res.send(myteams)
    }else{
        res.send(teams)
    }
})

//Obtener una sola tarea basado enla ruta /one/id
app.get('/teams/:id', function(req, res) {
    console.log(req.params);
    let id = req.params.id
    let mytask = teams.find(element => element.id == id)
    if (mytask) {
        res.send(mytask)
    }else{
        res.send({message: "Tarea no encontrada"})
    }    
})

/*Crear tarea
*REQ: SOLICITUD -> BODY (Es la tarea que voy a registrar)
*RES: RESPUESTA -> Le voy a retornat todas las tareas que hay agregadas
*/
app.post('/teams/', (req, res)=>{
    let body = req.body
    let id = body.id
    let mytask = teams.find(element => element.id == id)
    console.log(mytask);
    
    if (!mytask) {
        teams.push(body)
        res.status(201).send(teams)
    } else {
        res.status(400).send({message: "Task id already exists"})
    }
})

app.put('/teams/:id', (req, res) => {
    let body = req.body
    console.log(body);
    console.log(req.params);
    let id = req.params.id
    let mytask = teams.find(element => element.id == id)
    console.log(mytask);

    let index = teams.indexOf(mytask)
    console.log(index);
    
    teams.splice(index, 1, body)
    res.status(201).send(teams)
})

app.delete('/teams/:id', (req, res) => {
    let id = req.params.id
    let mytask = teams.find(element => element.id == id)
    let index = teams.indexOf(mytask)
    teams.splice(index, 1)
    res.send(teams)
    
})

module.exports = app