const service = require('../services/tasks').create()

module.exports = {
    create : function(){
        return new Task()
    }
}

class Task{
    constructor() {
        
    }

    /**
     * Insertar una tarea
     * @param {*} name Nombre de la tarea
     */
    async insert(name) {
        return await service.insert(name)
    }

    /**
     * Actualiza un elemento de la base de datos
     * @param {*} id Es el id del elemento a actualizar
     * @param {*} name Es el nuevo nombre
     * @param {*} activa es el nuevo estado del registro
     */
    async update(id, name, activa) {
        let sql = `UPDATE public.tasks SET name='${name}', activa=${activa} WHERE id = '${id}';`
        return response = await PG.execute(sql)
    }

    /**
     * Eliminar un registro de la base de datos
     * @param {*} id Es el identificador del registro que queremos borrar
     */
    async delete(id) {
        let sql = `DELETE FROM tasks WHERE id = '${id}'`
        return response = await PG.execute(sql)
    }

    async getAll(query) {
        let tasks = await service.getAll()

        if (query.active) {
            tasks = tasks.filter(element=>
                element.active.toString() == query.active)
        }
        return tasks
    }
}