const express = require('express');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

// create express app
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

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

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'paylessdemo',
    user     : 'root',
    password : 'irfanlc',
});

connection.connect(function(err) {
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

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Require Notes routes
//require('./app/routes/note.routes.js')(app);
    var postBody = {
        "method": "fastpay.pulsa",
        "uid": "FA9919",
        "pin": "------",
        "kode_produk": "I10H",
        "no_hp": "085648889293",
        "ref1": "ref1 value",
    };

    axios.post("https://partnerlink.fastpay.co.id:4343/json/index_devel.php", postBody)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

app.post('/api/mobile-credit',[
        check('method').not().isEmpty()
    ], (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({
                code: 400,
                type: "mobileCredit",
                message: "Required values are missing.",
                errors: errors.array()
            });
        }    

    res.json({
        code: 200,
        type: "mobileCredit",
        message: "Mobile credit success"
    });
});

app.post('/api/test', (req, res) => {

    //res.json({"message": "Welcome to APIs."});

	/*connection.query('SELECT * from users LIMIT 2', function(err, rows, fields) {
		connection.end();
	  	if (!err)
	  		res.status(200).json({"result": rows});
	  	else
	    	res.status(500).send({"message": err.sqlMessage});
	});*/

    var postBody = {
        "method": "fastpay.pulsa",
        "uid": "FA9919",
        "pin": "------",
        "kode_produk": "I10H",
        "no_hp": "085648889293",
        "ref1": "ref1 value",
    };

    axios.post("https://partnerlink.fastpay.co.id:4343/json/index_devel.php", postBody)
    .then(response => {
        res.status(200).json({
            code: 200,
            type: "mobileCredit",
            message: "Mobile credit success",
            result:response
        });
    })
    .catch(error => {
        res.status(500).({
            code: 500,
            type: "mobileCredit",
            message: "Something went wrong.",
            error:error
        });
    });

});

const port = 3008;
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});