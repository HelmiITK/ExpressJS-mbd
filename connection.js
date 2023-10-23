const mysql = require('mysql')

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "sortir_ikan"
    }
)

module.exports = db