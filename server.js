const express = require('express');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const {PORT} = process.env
const bodyParser = require('body-parser');

// create express app
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to APIs."});
});

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Require ppob routes
require('./app/routes/ppob.routes.js')(app);

/*app.post('/api/mobile-credit',[
        check('kode_produk').not().isEmpty(),
        check('no_hp').not().isEmpty()
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

    var postBody = {
        "method": "fastpay.pulsa",
        "uid": "FA9919",
        "pin": "------",
        "kode_produk": req.body.kode_produk,
        "no_hp": req.body.no_hp,
        "ref1": req.body.ref1,
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        res.status(200).json({
            code: 200,
            type: "mobileCredit",
            message: "Mobile credit success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "mobileCredit",
            message: "Something went wrong.",
            error:error
        });
    });
});*/


port = PORT || 3000;
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});