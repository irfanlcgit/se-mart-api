const Transection = require('../models/ppob.model.js');
// declare axios for making http requests
const axios = require('axios');
const {API_URL, API_UID, API_PIN} = process.env;
const { body, validationResult } = require('express-validator/check');

exports.validate = (method) => {
	if(method === 'mobileCredit'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty()
       ] 
	}
	if(method === 'payPhoneBill'){
		return [ 
        	body('area_code', 'area_code doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty(),
        	body('nominal', 'nominal doesn\'t exists').not().isEmpty(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payBPJS'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'customer_id doesn\'t exists').not().isEmpty(),
        	body('periode', 'periode doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty(),
        	body('nominal', 'nominal doesn\'t exists').not().isEmpty(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty()
       ]
	}
}


// Get mobile credit pricelist
exports.pricelistCredit = (req, res) => {

    var postBody = {
        "method": "fastpay.harga",
        "uid": API_UID,
        "pin": API_PIN,
        "produk": "TELKOMSEL"
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "pricelistCredit",
            message: "Mobile credit pricelist success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "pricelistCredit",
            message: "Something went wrong.",
            error:error
        });
    });
}

// Create and Save a mobile credit
exports.mobileCredit = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

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
        "uid": API_UID,
        "pin": API_PIN,
        "kode_produk": req.body.kode_produk,
        "no_hp": req.body.phone_number,
        "ref1": req.body.ref1,
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        var new_transection = new Transection({
        	Type: "mobileCredit",
        	response: result
        });

        Transection.createTransection(new_transection, function(err, transection) {
		    
		    if (err){
		      	res.status(500).json({
			        code: 500,
			        type: "mobileCredit",
			        message: "Something went wrong, Not inserted into database.",
			        error:err
			    });
		    }else{
		    	res.status(200).json({
			        code: 200,
			        type: "mobileCredit",
			        message: "Mobile credit success",
			        result:result
			    });
		    }
		});

        /*res.status(200).json({
            code: 200,
            type: "mobileCredit",
            message: "Mobile credit success",
            result:result
        });*/
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "mobileCredit",
            message: "Something went wrong.",
            error:error
        });
    });
};


// Create and Save a phone bill
exports.payPhoneBill = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "mobileCredit",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }
	
	var postBody = {
        "method": "fastpay.pay",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": req.body.ref1,
        "ref2": req.body.ref2,
        "ref3": "",
        "nominal": req.body.nominal,
        "kode_produk": "TELEPON",
        "idpel1": req.body.area_code,
        "idpel2": req.body.phone_number,
        "idpel3": ""
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        
        var new_transection = new Transection({
        	Type: "payPhoneBill",
        	response: result
        });

        Transection.createTransection(new_transection, function(err, transection) {
		    
		    if (err){
		      	res.status(500).json({
			        code: 500,
			        type: "payPhoneBill",
			        message: "Something went wrong, Not inserted into database.",
			        error:err
			    });
		    }else{
		    	res.status(200).json({
			        code: 200,
			        type: "payPhoneBill",
			        message: "Phone bill paid successfully.",
			        result:result
			    });
		    }
		});
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payPhoneBill",
            message: "Something went wrong.",
            error:error
        });
    });
};


// Create and Save a phone bill
exports.payBPJS = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "payBPJS",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }
	
	var postBody = {
        "method": "fastpay.bpjspay",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": req.body.ref1,
        "ref2": req.body.ref2,
        "nominal": req.body.nominal,
        "kode_produk": req.body.kode_produk,
        "idpel1": req.body.customer_id,
        "periode": req.body.periode,
        "no_hp": req.body.phone_number
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        
        var new_transection = new Transection({
        	Type: "payBPJS",
        	response: result
        });

        Transection.createTransection(new_transection, function(err, transection) {
		    
		    if (err){
		      	res.status(500).json({
			        code: 500,
			        type: "payBPJS",
			        message: "Something went wrong, Not inserted into database.",
			        error:err
			    });
		    }else{
		    	res.status(200).json({
			        code: 200,
			        type: "payBPJS",
			        message: "BPJS paid successfully.",
			        result:result
			    });
		    }
		});
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payBPJS",
            message: "Something went wrong.",
            error:error
        });
    });
};


// Create a phone bill
/**
 * @swagger
 * /pay-phone-bill:
 *  post:
 *    summary: Pay your mobile credit
 *    tags:
 *      - fastpay
 *    security:
 *      - bearerAuth: []
 *  parameters:
 *    - name: body
 *      in: body
 *      description: Body object that needs to be create transection
 *      required: true
 *      schema:
 *        type: object
 *        required:
 *          - area_code
 *          - phone_number
 *          - ref2
 *          - nominal
 *        properties:
 *          area_code:
 *            type: string
 *          phone_number:
 *            type: string
 *          nominal:
 *            type: string
 *          ref1:
 *            type: string
 *            example: ref1 value
 *          ref2:
 *            type: string
 *            example: ref2 value 
 *  responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Reqired data is missing
 *      '401':
 *        description: Unauthorized
 *  api_key: []
 */
// app.post('/api/pay-phone-bill', ppob.validate('payPhoneBill'), ppob.payPhoneBill);