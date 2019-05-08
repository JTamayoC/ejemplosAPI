//Importar libreria
var express = require('express');
//Inicializar libreria
var app = express();
//Arreglo de tareas
let tasks=[];

const service = require('../services/tasks').create()
const controller = require('../controllers/tasks').create()

//Obtener tareas basado enla ruta /true or false/
app.get('/tasks/', function(req, res) {
    //console.log('Estoy en el get');    
    //res.status(404).send('<h1>API not found</h1>')
    let query = req.query
    let myTasks = []
    controller.getAll(query).then(response=>{
        res.status(200).send(response)
    }).catch(error =>{
        console.log(error);
        
    })

})

//Pendiente por base de datos--------------------
//Obtener una sola tarea basado enla ruta /filter/id
app.get('/tasks/filter/:name?', function(req, res) {
    console.log(req.params);
    let name = req.params.name
    if (name) {
        let mytasks = tasks.filter(element => (element.name).includes(name))
        res.send(mytasks)
    }else{
        res.send(tasks)
    }
})

//Pendiente por base de datos--------------------
//Obtener una sola tarea basado enla ruta /one/id
app.get('/tasks/:id', function(req, res) {
    console.log(req.params);
    let id = req.params.id
    let mytask = tasks.find(element => element.id == id)
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
app.post('/tasks/', (req, res)=>{
        let body = req.body
        //Capturo la respuesta de la insercion a la base de datos
        controller.insert(body.name).then(response=> {
            res.status(201).send(tasks)
        }).catch(error => {
            console.log(error);
            res.status(400).send({message: "Error al insertar la tarea"})
        })
})

//Pendiente por base de datos--------------------
app.put('/tasks/:id', (req, res) => {
    let body = req.body
    console.log(body);
    console.log(req.params);
    let id = req.params.id
    let mytask = tasks.find(element => element.id == id)
    console.log(mytask);

    let index = tasks.indexOf(mytask)
    console.log(index);
    
    tasks.splice(index, 1, body)
    res.status(201).send(tasks)
})

app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id
    controller.delete(id).then(response=> {
        res.status(200).send({message:"Tarea eliminada"})
    }).catch(error=>{
        res.status(400).send({message: "Error al insertar la tarea"})
    })
})

module.exports = app