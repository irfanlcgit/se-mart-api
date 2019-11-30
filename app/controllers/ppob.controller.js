const Transection = require('../models/ppob.model.js');
// declare axios for making http requests
const axios = require('axios');
const {API_URL, API_UID, API_PIN} = process.env;
const { body, validationResult } = require('express-validator/check');
const uniqueRandom = require('unique-random');
const random = uniqueRandom(1, 100000000);

exports.validate = (method) => {
	if(method === 'mobileCredit'){
		return [ 
            body('ref_customer_id', 'Ref customer id doesn\'t exists').not().isEmpty(),
        	body('product_code', 'Product code doesn\'t exists').not().isEmpty(),
            body('phone_number', 'Phone number doesn\'t exists').not().isEmpty(),
            body('price', 'Price should be a number').not().isEmpty().isNumeric(),
            body('saldoterpotong', 'Saldoterpotong should be a number').not().isEmpty().isNumeric(),
            body('value', 'Value doesn\'t exists').not().isEmpty(),
            body('type', 'Type doesn\'t exists').not().isEmpty(),
        	body('payment_method', 'Payment method doesn\'t exists').not().isEmpty()
       ] 
	}
	if(method === 'inquiryPhone'){
		return [ 
            body('kode_produk', 'kode produk doesn\'t exists').not().isEmpty(),
        	body('area_code', 'Area code doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'Phone number doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payPhoneBill'){
		return [ 
            body('ref_customer_id', 'Ref customer id doesn\'t exists').not().isEmpty(),
            body('product_code', 'Product code doesn\'t exists').not().isEmpty(),
        	body('area_code', 'Area code doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'Phone number doesn\'t exists').not().isEmpty(),
        	body('nominal', 'Nominal  should be a number').not().isEmpty().isInt(),
            body('biayaadmin', 'biayaadmin should be a number').not().isEmpty().isInt(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'Payment method doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'inquiryElectricity'){
		return [ 
            body('kode_produk', 'kode produk doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'Customer id doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payElectricityBill'){
		return [ 
            body('ref_customer_id', 'Ref customer id doesn\'t exists').not().isEmpty(),
            body('product_code', 'Product code doesn\'t exists').not().isEmpty(),
            body('customer_id', 'Customer id doesn\'t exists').not().isEmpty(),
            body('nominal', 'Nominal  should be a number').not().isEmpty().isInt(),
            body('biayaadmin', 'biayaadmin should be a number').not().isEmpty().isInt(),
            body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'Payment method doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'bpjsInquiry'){
		return [ 
        	body('kode_produk', 'Kode produk doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'Customer id doesn\'t exists').not().isEmpty(),
        	body('periode', 'Periode doesn\'t exists').not().isEmpty()
       ]
	}
	if(method === 'payBPJS'){
		return [ 
            body('ref_customer_id', 'Ref customer id doesn\'t exists').not().isEmpty(),
        	body('product_code', 'Product code doesn\'t exists').not().isEmpty(),
        	body('customer_id', 'Customer id doesn\'t exists').not().isEmpty(),
        	body('phone_number', 'Phone number doesn\'t exists').not().isEmpty(),
            body('periode', 'Periode doesn\'t exists').not().isEmpty(),
            body('nominal', 'Nominal should be a number').not().isEmpty().isInt(),
            body('biayaadmin', 'biayaadmin should be a number').not().isEmpty().isInt(),
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty(),
            body('payment_method', 'Payment method doesn\'t exists').not().isEmpty()
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
        	body('kode_produk', 'Kode produk doesn\'t exists').not().isEmpty()
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

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){
            var pricelist = filterPricelist(result.keterangan);
            if(pricelist){
                res.status(200).json({
                    code: 200,
                    type: "pricelistCredit",
                    message: "Mobile credit pricelist success",
                    result:pricelist
                });
            }else{
                res.status(500).json({
                    code: 500,
                    type: "pricelistCredit",
                    message: "Something went wrong.",
                    error:result.keterangan
                });
            }
        }else{
            res.status(500).json({
                code: 500,
                type: "pricelistCredit",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "pricelistCredit",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "kode_produk": req.body.product_code,
        "no_hp": req.body.phone_number,
        "ref1": req.body.ref1,
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){
            var new_transection = new Transection({
                order_id: random(),
                bill_id: (req.body.type === "internet")? 2 : 1,
                ref_customer_id: req.body.ref_customer_id.replace(/_FS_/g, '\\'),
                product_code: req.body.product_code,
                area_code: null,
                phone: req.body.phone_number,
                customer_id: null,
                period: null,
                payment_method: req.body.payment_method,
                value: req.body.value, 
                price: req.body.price,
                charge: req.body.saldoterpotong,
                profit: req.body.price - req.body.saldoterpotong,
                trx_status: result.keterangan
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
    			        result:result.keterangan
    			    });
    		    }
    		});
        }else{
            res.status(500).json({
                code: 500,
                type: "payPhoneBill",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "mobileCredit",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "ref1": req.body.ref1,
        "kode_produk": req.body.kode_produk,
        "idpel1": req.body.area_code,
        "idpel2": req.body.phone_number,
    	"idpel3": ""
    };



    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "inquiryPhone",
                message: "Inquiry success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "inquiryPhone",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "inquiryPhone",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "kode_produk": req.body.product_code,
        "idpel1": req.body.area_code,
        "idpel2": req.body.phone_number,
        "idpel3": ""
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){

            var new_transection = new Transection({
                    order_id: random(),
                    bill_id: 5,
                    ref_customer_id: req.body.ref_customer_id,
                    product_code: req.body.product_code,
                    area_code: req.body.area_code,
                    phone: req.body.phone_number,
                    customer_id: req.body.customer_id,
                    period: null,
                    payment_method: req.body.payment_method,
                    value: req.body.nominal, 
                    price: req.body.nominal + req.body.biayaadmin,
                    charge: parseInt(result.saldoterpotong),
                    profit: req.body.nominal + req.body.biayaadmin - parseInt(result.saldoterpotong),
                    trx_status: result.keterangan
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
                        result:result.keterangan
                    });
                }
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "payPhoneBill",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
        
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payPhoneBill",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "ref1": req.body.ref1,
        "kode_produk": req.body.kode_produk,
        "idpel1": req.body.customer_id,
        "idpel2": "",
    	"idpel3": ""
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "inquiryElectricity",
                message: "Inquiry success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "inquiryElectricity",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "inquiryElectricity",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "kode_produk": req.body.product_code,
        "idpel1": req.body.customer_id,
        "idpel2": "",
        "idpel3": ""
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){

            var new_transection = new Transection({
                    order_id: random(),
                    bill_id: 3,
                    ref_customer_id: req.body.ref_customer_id,
                    product_code: req.body.product_code,
                    area_code: null,
                    phone: null,
                    customer_id: req.body.customer_id,
                    period: null,
                    payment_method: req.body.payment_method,
                    value: req.body.nominal, 
                    price: req.body.nominal + req.body.biayaadmin,
                    charge: parseInt(result.saldoterpotong),
                    profit: req.body.nominal + req.body.biayaadmin - parseInt(result.saldoterpotong),
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
                        message: "Electricity bill paid successfully.",
                        result:result.keterangan
                    });
                }
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "payElectricityBill",
                message: "Something went wrong.",
                error:result.keterangan
            });

        }
        
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payElectricityBill",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "ref1": req.body.ref1,
        "kode_produk": req.body.kode_produk,
    	"idpel1": req.body.customer_id,
    	"periode": req.body.periode
    };

    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "bpjsInquiry",
                message: "BPJS Inquiry success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "bpjsInquiry",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "bpjsInquiry",
            message: "Fastpay API failed to response.",
            error:error.message
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
        "kode_produk": req.body.product_code,
        "idpel1": req.body.customer_id,
        "periode": req.body.periode,
        "no_hp": req.body.phone_number
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){

            var new_transection = new Transection({
                    order_id: random(),
                    bill_id: 4,
                    ref_customer_id: req.body.ref_customer_id,
                    product_code: req.body.product_code,
                    area_code: null,
                    phone: req.body.phone_number,
                    customer_id: req.body.customer_id,
                    period: req.body.periode,
                    payment_method: req.body.payment_method,
                    value: req.body.nominal, 
                    price: req.body.nominal + req.body.biayaadmin,
                    charge: parseInt(result.saldoterpotong),
                    profit: req.body.nominal + req.body.biayaadmin - parseInt(result.saldoterpotong),
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
                        message: "BPJS paid successfully.",
                        result:result.keterangan
                    });
                }
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "payBPJS",
                message: "Something went wrong.",
                error:result.keterangan
            });

        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "payBPJS",
            message: "Fastpay API failed to response.",
            error:error.message
        });
    });
};


//GET TRANSACTION DATA
exports.getTransaction = (req, res) => {


    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).json({
                timestamp: new Date(),
                path: "/api/get-transactions",
                status: 400,
                error: "Required values are missing.",
                message: errors.array()
        });
    }
    var transectionData = {
            orderNo: req.body.orderNo
        }
    Transection.getTransection( transectionData, function(err, transection) {
            
                if (err){
                    res.status(500).json({
                        timestamp: new Date(),
                        path: "/api/get-transaction",
                        status: 500,
                        error: "Internal Server Error",
                        message: err
                    });
                }else{
                    res.status(200).json({
                        status:0,
                        message:"Success",
                        size:1,
                        pageBefore:"#",
                        pageAfter:"#",
                        ppobList:transection,
                        totalPages:1,
                        totalElements:1
                    });
                }
            });

}
//GET TRANSACTIONS DATA
exports.getTransactions = (req, res) => {
    var new_transection = new Transection({
                    ref_customer_id: req.body.ref_customer_id
                });
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).json({
                timestamp: new Date(),
                path: "/api/get-transactions",
                status: 400,
                error: "Required values are missing.",
                message: errors.array()
        });
    }

    if(req.body.ref_customer_id){
        var transectionData = {
            refCustomerId: req.body.ref_customer_id.replace(/_FS_/g, '\\')
        }
        Transection.getTransectionsByCustomerId( transectionData, function(err, transections) {
            
                if (err){
                    res.status(500).json({
                        timestamp: new Date(),
                        path: "/api/get-transactions",
                        status: 500,
                        error: "Internal Server Error",
                        message: err
                    });
                }else{
                    res.status(200).json({
                        status:0,
                        message:"Success",
                        size:1,
                        pageBefore:"#",
                        pageAfter:"#",
                        ppobList:transections,
                        totalPages:1,
                        totalElements:1
                    });
                }
            });
    }else{
        const page = req.body.page; 
        const pageLength = req.body.pageLength; 
        var transectionData = {
                  offset: page > 1? (page*pageLength)-pageLength : page-1,
                  limit: pageLength,
                  orderNo: req.body.orderNo,
                  dateFrom: req.body.dateFrom,
                  dateTo: req.body.dateTo,
                  bill: req.body.workflowState
            }
    //console.log("transectionData=>", transectionData);

        Transection.getCountTransections( transectionData, function(err, total) {

            if (err){
                res.status(500).json({
                    timestamp: new Date(),
                    path: "/api/get-transactions",
                    status: 500,
                    error: "Internal Server Error",
                    message: err
                });
            }else{
                var pageBefore = "#";
                var pageAfter = "#";
                var totalPages = Math.floor(total/pageLength);
                if(total%pageLength > 0){
                    totalPages++;
                }
                if(page > 1 && page <= totalPages){
                    pageBefore = page-1;
                }
                if(totalPages > page){
                    pageAfter = page+1;
                }

                Transection.getTransections( transectionData, function(err, transections) {
                
                    if (err){
                        res.status(500).json({
                            timestamp: new Date(),
                            path: "/api/get-transactions",
                            status: 500,
                            error: "Internal Server Error",
                            message: err
                        });
                    }else{
                        res.status(200).json({
                            status:0,
                            message:"Success",
                            size:total,
                            pageBefore:pageBefore,
                            pageAfter:pageAfter,
                            ppobList:transections,
                            totalPages:totalPages,
                            totalElements:total
                        });
                    }
                });
            }

        });
    }
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
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "transactionData",
                message: "Transaction status get success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "transactionData",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "transactionData",
            message: "Fastpay API failed to response.",
            error:error.message
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
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "statusCheck",
                message: "Transaction status get success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "statusCheck",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "statusCheck",
            message: "Fastpay API failed to response.",
            error:error.message
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
        if(result.status === "00"){
            res.status(200).json({
                code: 200,
                type: "balanceCheck",
                message: "Balance get success",
                result:result
            });
        }else{
            res.status(500).json({
                code: 500,
                type: "balanceCheck",
                message: "Something went wrong.",
                error:result.keterangan
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "balanceCheck",
            message: "Fastpay API failed to response.",
            error:error.message
        });
    });
}


// Re-print transaction receipt
exports.rePrint = (req, res) => {

	const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 400,
            type: "rePrint",
            message: "Required values are missing.",
            errors: errors.array()
        });
    }
	
	var postBody = {
        "method": "fastpay.cu",
        "uid": API_UID,
        "pin": API_PIN,
        "ref1": req.body.ref1,
        "ref2": req.body.ref2
    }


    axios.post(API_URL, postBody)
    .then(response => {
        var result = response.data;
        if(result.status === "00"){

            // var new_transection = new Transection({
            //         order_id: random(),
            //         bill_id: 4,
            //         product_code: req.body.kode_produk,
            //         area_code: null,
            //         phone: req.body.phone_number,
            //         customer_id: req.body.customer_id,
            //         period: req.body.periode,
            //         payment_method: req.body.payment_method,
            //         value: req.body.nominal, 
            //         price: req.body.nominal + req.body.biayaadmin,
            //         charge: result.saldoterpotong,
            //         profit: req.body.nominal + req.body.biayaadmin - result.saldoterpotong,
            //         trx_status: result.keterangan
            //     });
                // Transection.createTransection(new_transection, function(err, transection) {
            
                // if (err){
                //     res.status(500).json({
                //         code: 500,
                //         type: "payBPJS",
                //         message: "Something went wrong, Not inserted into database.",
                //         error:err
                //     });
                // }else{
                    res.status(200).json({
                        code: 200,
                        type: "rePrint",
                        message: "rePrint receipt of billing",
                        result:result
                    });
                // }
            // }
            // );
        }else{
            res.status(500).json({
                code: 500,
                type: "rePrint",
                message: "Something went wrong.",
                error:result.keterangan
            });

        }
    })
    .catch(error => {
        res.status(500).json({
            code: 500,
            type: "rePrint",
            message: "Fastpay API failed to response.",
            error:error.message
        });
    });
};

// filter pricelist
filterPricelist = (keterangan) => {
	var result_array = [];
    if( keterangan.indexOf(';') === -1 ){
        return false;
    }
	result = keterangan.split(";");
	for (var i = 0; i < result.length-1; i++) {
		var str_data = result[i].split(" ");
        if(str_data[0] === "Operator" && i === 0){
           return false; 
        }
        var kode_produk= str_data[0];
        var saldoterpotong_remove = "Rp."+result[i].substr(result[i].lastIndexOf(".") + 1).replace(/,\s*$/, "");
        var saldoterpotong = result[i].substr(result[i].lastIndexOf(".") + 1).replace(/,/g, '');
		//var price = result[i].substr(result[i].lastIndexOf(".") + 1).replace(/,/g, '');
        var price =  (Math.ceil((parseInt(saldoterpotong) / 5000))) * 5000;
        var description = result[i].replace(saldoterpotong_remove, '').replace(kode_produk, '');
		description = description.replace(/ *\([^)]*\) */g, "").replace(/,\s*$/, "").trim();
        var type = getPricelistType(description);
        var value = getPricelistValue(description, type);
        result_array.push({
			kode_produk: kode_produk,
            price: price,
            saldoterpotong: parseInt(saldoterpotong),
            description: description,
            value: value,
            type: type
		});

	}
	
	return result_array;
};

getPricelistType = (desc) => {
    var substrings = ["DATA", "Data", "GB", "MB"];
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (desc.indexOf(substring) != - 1) {
         return "internet";
       }
    }
    return "credit";
}

getPricelistValue = (desc, type) => {
    var value = 0;
    
    if(type === "internet"){
        var key = (desc.indexOf("GB") != - 1)? "GB" : "MB";
        var find = ' '+key;
        var re = new RegExp(find, 'gi');
        var new_desc = desc.replace(re, key);
        new_desc = new_desc.split("+").join(" + ");
        var substrings = new_desc.split(" ");
        for (var i = 0; i != substrings.length; i++) {
            var substring = substrings[i];
            if (substring.indexOf(key) != - 1) {
                value = value + parseFloat(substring);
            }
        }
        value = value + key;
    }else{
        var new_desc = desc.replace(/ Mnt/gi, "mnt");
        new_desc = new_desc.split("+").join(" + ");
        var key = (new_desc.indexOf("mnt") != - 1)? "mnt" : "RB";
        var substrings = new_desc.split(" ");
        for (var i = 0; i != substrings.length; i++) {
            var substring = substrings[i];
            if (substring.indexOf(key) != - 1) {
                value = value + parseFloat(substring);
            }
        }
        if(key === "RB"){
           value = value * 1000; 
        }else{
            value = value + key; 
        }
    }
    return value.toString();
}
