const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
/*const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});*/

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'paylessdemo',
    user     : 'root',
    password : 'irfanlc',
});

/*connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});*/


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to APIs."});
});

// Require Notes routes
//require('./app/routes/note.routes.js')(app);

app.post('/api/test', (req, res) => {

    //res.json({"message": "Welcome to APIs."});

	/*connection.query('SELECT * from users LIMIT 2', function(err, rows, fields) {
		connection.end();
	  	if (!err)
	  		res.status(200).json({"result": rows});
	  	else
	    	res.status(500).send({"message": err.sqlMessage});
	});*/
    var postBody = {};

    axios.post(`https://partnerlink.fastpay.co.id:4343/devel/cek_ip.php`, postBody)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });

});

// listen for requests
app.listen(3008, () => {
    console.log("Server is listening on port 3008");
});