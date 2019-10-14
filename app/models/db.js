var mysql = require('mysql');
const {SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD} = process.env;

//local mysql db connection
var connection = mysql.createConnection({
    host     : SQL_SERVER,
    database : SQL_DATABASE,
    user     : SQL_USER,
    password : SQL_PASSWORD
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;