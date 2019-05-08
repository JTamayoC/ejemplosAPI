const {Client} = require('pg')
const config = require('../../config')

module.exports = {
   create : function () { return new Database() }
}

class Database {

    constructor() {
        this.client = new Client(config.connectionPostgres)
        this.connection()
    }

    async connection (){
        await this.client.connect()
    }

    /**
     * Ejecutar una sentencia SQL
     * @param {*} sql Sentencia SQL
     */
    async executerows(sql) {
        let response = await this.client.query(sql)
        return response.rows
    }

    /**
     * Ejecutar una sentencia SQL
     * @param {*} sql Sentencia SQL
     */
    async execute(sql) {
        let response = await this.client.query(sql)
        return response
    }
}