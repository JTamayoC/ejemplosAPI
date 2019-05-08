function getAll() {
    console.log('Consultar las tareas');
    var xmlhttprequest = new XMLHttpRequest();
    var url = 'http://localhost:3000/tasks/'

    xmlhttprequest.open('GET', url)
    xmlhttprequest.addEventListener('load', function(){
        console.log(this);
        var data = JSON.parse(this.response)
        data.forEach(element => {
            document.getElementById('tasksbox').innerHTML+="<tr><td>"+element.id + "</td><td>" + element.name+"</td>"+ element.status +"<td></td>" +"</tr>"
        });
    })
    xmlhttprequest.send()
}

function getAll2() {
    var url = 'http://localhost:3000/tasks/'
    axios.get(url).then(response=>{
        console.log(response);
        var data = response.data
        document.getElementById('tasksbox').innerHTML="<thead><th>Id</th><th>Nombre</th><th>Estado</th></thead>"
            data.forEach(element => {
            document.getElementById('tasksbox').innerHTML += "<tr><td>"+element.id + "</td><td>" + element.name+"</td><td>"+ "<input type='checkbox'>" +"</td></tr>"
        });
    }).catch(error => {
        console.log(error)
    })
}

function addTask() {
    var url = 'http://localhost:3000/tasks/'
    var data = {
        "id": 1,
        "name": "Mi tarea 1",
        "status": true
    }
    axios.post(url, data).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    }).then(()=>{
        getAll2()
    })
}

function putTask() {
    var data = {
        "id": 1,
        "name": "Mi tarea modificada",
        "status": true
    }
    var url = `http://localhost:3000/tasks/${data.id}`
    console.log('Modificar tarea');
    axios.put(url, data).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    }).then(()=>{
        getAll2()
    })
}

getAll2()