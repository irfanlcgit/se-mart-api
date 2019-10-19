const Transection = require('../models/ppob.model.js');
// declare axios for making http requests
const axios = require('axios');
const {API_URL, API_UID, API_PIN} = process.env;
const { body, validationResult } = require('express-validator/check');

exports.validate = (method) => {
	if(method === 'mobileCredit'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty(),
            body('phone_number', 'phone_number doesn\'t exists').not().isEmpty(),
        	body('payment_method', 'payment_method doesn\'t exists').not().isEmpty()
       ] 
	}
	if(method === 'inquiryPhone'){
		return [ 
        	body('area_code', 'area_code doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payPhoneBill'){
		return [ 
        	body('area_code', 'area_code doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty(),
        	body('nominal', 'nominal doesn\'t exists').not().isEmpty(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'payment_method doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'inquiryElectricity'){
		return [ 
        	body('customer_id', 'customer_id doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payElectricityBill'){
		return [ 
        	body('customer_id', 'customer_id doesn\'t exists').not().isEmpty(),
        	body('nominal', 'nominal doesn\'t exists').not().isEmpty(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'payment_method doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'bpjsInquiry'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'customer_id doesn\'t exists').not().isEmpty(),
        	body('periode', 'periode doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payBPJS'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'customer_id doesn\'t exists').not().isEmpty(),
        	body('periode', 'periode doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'phone_number doesn\'t exists').not().isEmpty(),
        	body('nominal', 'nominal doesn\'t exists').not().isEmpty(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'payment_method doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'transactionData'){
		return [ 
        	body('tgl1', 'tgl1 doesn\'t exists').not().isEmpty(),
        	body('tgl2', 'tgl2 doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'statusCheck'){
		return [ 
        	body('kode_produk', 'kode_produk doesn\'t exists').not().isEmpty()
       ] 
	}
}


// Get mobile credit pricelist
exports.pricelistCredit = async (req, res) => {

    var postBody = {
        "method": "fastpay.harga",
        "uid": API_UID,
        "pin": API_PIN,
        "produk": req.params.produk
    };

 	res.status(200).json({
            code: 200,
            type: "pricelistCredit",
            message: "Mobile credit pricelist success",
            result:result_data
        });

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

// Inquiry Phone
exports.inquiryPhone = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "inquiryPhone",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }
    
    var postBody = {
        "method": "fastpay.inq",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": "REF1_VALUE",
        "kode_produk": "TELEPON",
        "idpel1": req.body.area_code,
        "idpel2": req.body.phone_number,
    	"idpel3": ""
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "inquiryPhone",
            message: "Inquiry success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "inquiryPhone",
            message: "Something went wrong.",
            error:error
        });
    });
}

// Create and Save a phone bill
exports.payPhoneBill = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "payPhoneBill",
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
        if(result.status === "00"){

	        var new_transection = new Transection({
					order_id: "32323",
					bill_id: 5,
					product_code: "TELEPON",
					area_code: req.body.area_code,
					phone: req.body.phone_number,
					customer_id: null,
					period: null,
					payment_method: req.body.payment_method,
					value: null, 
					price: req.body.nominal,
					charge: result.saldoterpotong,
					profit: req.body.nominal - result.saldoterpotong,
					trx_status: result.keterangan
	        	});
	        	res.status(200).json({
                        code: 200,
                        type: "payPhoneBill",
                        message: "Phone bill paid successfully.",
                        result:result
                    });
    	}else{
    		res.status(500).json({
				code: 500,
				type: "payPhoneBill",
				message: "Something went wrong, Not inserted into database.",
				error:result
			});

    	}
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


// Inquiry Electricity
exports.inquiryElectricity = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "inquiryElectricity",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }
    
    var postBody = {
        "method": "fastpay.inq",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": "REF1_VALUE",
        "kode_produk": "PLNNONH",
        "idpel1": req.body.customer_id,
        "idpel2": "",
    	"idpel3": ""
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "inquiryElectricity",
            message: "Inquiry success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "inquiryElectricity",
            message: "Something went wrong.",
            error:error
        });
    });
}

// Create and Save a Electricity bill
exports.payElectricityBill = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "payElectricityBill",
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
        "kode_produk": "PLNNONH",
        "idpel1": req.body.customer_id,
        "idpel2": "",
        "idpel3": ""
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){

            var new_transection = new Transection({
                    order_id: "323231",
                    bill_id: 3,
                    product_code: "PLNNONH",
                    area_code: null,
                    phone: null,
                    customer_id: req.body.customer_id,
                    period: null,
                    payment_method: req.body.payment_method,
                    value: null, 
                    price: req.body.nominal,
                    charge: result.saldoterpotong,
                    profit: req.body.nominal - result.saldoterpotong,
                    trx_status: result.keterangan
                });
                Transection.createTransection(new_transection, function(err, transection) {
            
                if (err){
                    res.status(500).json({
                        code: 500,
                        type: "payElectricityBill",
                        message: "Something went wrong, Not inserted into database.",
                        error:err
                    });
                }else{
                    res.status(200).json({
                        code: 200,
                        type: "payElectricityBill",
                        message: "Phone bill paid successfully.",
                        result:result
                    });
                }
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "payElectricityBill",
                message: "Something went wrong, Not inserted into database.",
                error:result
            });

        }
        
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payElectricityBill",
            message: "Something went wrong.",
            error:error
        });
    });
};

// BPJS Inquiry
exports.bpjsInquiry = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "bpjsInquiry",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }

    var postBody = {
        "method": "fastpay.bpjsinq",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": "REF1_VALUE",
        "kode_produk": req.body.kode_produk,
    	"idpel1": req.body.customer_id,
    	"periode": req.body.periode
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "bpjsInquiry",
            message: "BPJS Inquiry success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "bpjsInquiry",
            message: "Something went wrong.",
            error:error
        });
    });
}


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
        if(result.status === "00"){

            var new_transection = new Transection({
                    order_id: "323231",
                    bill_id: 4,
                    product_code: req.body.kode_produk,
                    area_code: null,
                    phone: req.body.phone_number,
                    customer_id: req.body.customer_id,
                    period: req.body.periode,
                    payment_method: req.body.payment_method,
                    value: null, 
                    price: req.body.nominal,
                    charge: result.saldoterpotong,
                    profit: req.body.nominal - result.saldoterpotong,
                    trx_status: result.keterangan
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
                        message: "Phone bill paid successfully.",
                        result:result
                    });
                }
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "payBPJS",
                message: "Something went wrong, Not inserted into database.",
                error:result
            });

        }
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


//GET TRANSACTIONS DATA
exports.getTransactions = (req, res) => {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "getTransaction",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }

    Transection.getTransections( function(err, transections) {
            
        if (err){
            res.status(500).json({
                code: 500,
                type: "getTransaction",
                message: "Something went wrong, Not inserted into database.",
                error:err
            });
        }else{
            res.status(200).json({
                code: 200,
                type: "getTransaction",
                message: "Get transactions successfully.",
                result:transections
            });
        }
    });

};

//TRANSACTION DATA
exports.transactionData = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "transactionData",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }

    var postBody = {
        "method": "fastpay.datatransaksi",
        "uid": API_UID,
        "pin": API_PIN,
        "kode_produk": req.body.kode_produk,
        "idpel": req.body.idpel,
        "id_transaksi" : req.body.id_transaksi,
        "tgl1" : req.body.tgl1,
        "tgl2" : req.body.tgl2,
        "limit" : req.body.limit
    }

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "transactionData",
            message: "Transaction status get success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "transactionData",
            message: "Something went wrong.",
            error:error
        });
    });

};


//STATUS CHECK
exports.statusCheck = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "statusCheck",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }

    var postBody = {
        "method": "fastpay.cekstatus",
        "uid": API_UID,
        "pin": API_PIN,
        "kode_produk": req.body.kode_produk,
        "idpel1": req.body.idpel1,
        "idpel2": req.body.idpel2,
        "tgl" : req.body.tgl,
        "ref1": req.body.ref1,
        "ref2": req.body.ref2,
        "denom" : req.body.denom
    }

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "statusCheck",
            message: "Transaction status get success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "statusCheck",
            message: "Something went wrong.",
            error:error
        });
    });

};

// Get remaining balance
exports.balanceCheck = (req, res) => {

    var postBody = {
        "method": "fastpay.balance",
        "uid": API_UID,
        "pin": API_PIN
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;

        res.status(200).json({
            code: 200,
            type: "balanceCheck",
            message: "Balance get success",
            result:result
        });
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "balanceCheck",
            message: "Something went wrong.",
            error:error
        });
    });
}


// filter pricelist
/*filterPricelist = (array) => {
	var result_array = [];
	var result = array.split(";");
	for (var i = 0; i < result.length-1; i++) {
		var str_data = result[i].split(" ");
		var price = result[i].substr(result[i].lastIndexOf(".") + 1).replace(/,/g, '');
		result_array.push({
			kode_produk: str_data[0],
			detail: result[i],
			price: price
		});

	}
	
	return result_array;
}*/
