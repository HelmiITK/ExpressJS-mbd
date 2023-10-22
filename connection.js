const mysql = require('mysql')

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "penyortiran_ikan_muarabadak"
    }
)

module.exports = db