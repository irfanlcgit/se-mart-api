const express = require('express');
var cors = require('cors');
// create express app
const app = express();
app.use(cors());
//const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
const {PORT} = process.env
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(expressValidator());


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to APIs."});
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "PPOB APIs",
      version: '1.0.0',
      description: "Realize your dreams by becoming a Fastpay Modern Shop Partner.",
      contact: {
        name: "Developer",
        email: "link2mirfan@gmail.com"
      }
    },
    host: '128.199.170.4:3008',
    basePath: '/api',
    securityDefinitions: {
        ApiKeyAuth: {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        },
    },
  },
  apis: ['app/routes/*.js']
  //apis: ["server.js"]
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Require ppob routes
require('./app/routes/ppob.routes.js')(app);


port = PORT || 3000;
// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});