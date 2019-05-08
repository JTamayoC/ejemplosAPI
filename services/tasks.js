const PG = require('./db/postgresql').create()

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
        let sql = `INSERT INTO public.tasks(name, activa) VALUES ('${name}', ${false});`
        let response = await PG.execute(sql)
        console.log(response);
        return response
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
        let response = await PG.execute(sql)
        console.log(response);
        return response
    }

    async getAll() {
        let sql = `SELECT * FROM tasks`
        return await PG.executerows(sql)
    }
}