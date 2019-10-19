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
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty()
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
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty()
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
        	body('ref2', 'ref2 doesn\'t exists').not().isEmpty()
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
    var output =  {
    	"uid": "SP125408",
    	"pin": "765384",
    	"saldo": "100901",
    	"status": "00",
    	"keterangan": "AGUH (0) Axis Data Gaul Unlimited 30 Hari Rp.35,500,;XDT100H (0) XL XTRA KUOTA MOBILE LEGEND 10GB 30 HARI Rp.10,500,;XDT50H (0) XL XTRA KUOTA MIDNIGHT 5GB 30 HARI Rp.10,500,;AXD1H (1) Axis BRONET 1GB,24JAM Aktif 30 Hari Rp.17,950,;AXDV1H (1) AXIS DATA VOUCHER 1Gb, 30Hr Rp.15,200,;XD1H (1) XL HOTROD 1,5 GB 30HARI Rp.46,055,;AXD2H (2) Axis BRONET 2GB,24JAM Aktif 30 Hari Rp.26,350,;AXDV2H (2) AXIS DATA VOUCHER 2Gb, 30Hr Rp.23,350,;AXD3H (3) Axis BRONET 3GB,24JAM Aktif 30 Hari Rp.35,350,;AXDV3H (3) AXIS DATA VOUCHER 3Gb, 30Hr Rp.32,950,;XDH3H (3) 3GB 30hr 2/3/4G 24jam Rp.53,400,;AXD5H (5) Axis BRONET 5GB,24JAM Aktif 30 Hari Rp.53,500,;AXDV5H (5) AXIS DATA VOUCHER 5Gb, 30Hr Rp.45,700,;XT5H (5) XL TRANSFER 5RB Rp.5,900,;XDH6H (6) 6GB 30hr 2/3/4G 24jam Rp.91,800,;XDH8H (8) 8GB 30hr 2/3/4G 24jam Rp.118,800,;XDC12H (12) XL 5GB + youtube5GB + 20mnt all opr Rp.53,450,;XDH12H (12) 12GB 30hr 2/3/4G 24jam Rp.163,800,;XDH15H (15) 1,5GB 30hr 2/3/4G 24jam Rp.44,000,;XDH16H (16) 16GB 30hr 2/3/4G 24jam Rp.201,000,;XDC19H (19) XL 10GB + youtube10GB + 40mnt all opr Rp.80,550,;XDC26H (26) XL/Axis 15GB + youtube15GB + 40mnt all opr Rp.116,650,;AKS30H (30) AXIS KZL Chat ,30Hari Rp.15,225,;XD30H (30) XL HOTROD 800MB 30HARI Rp.26,900,;XD35H (35) XL Data BB GAUL Rp.53,300,;XD40H (40) XL Data BB FULL BIS + PULSA 40RB Rp.81,300,;XDC40H (40) XL 20GB + youtube 20GB + 60mnt all opr Rp.165,200,;XDC56H (56) XL 35GB + youtube 35GB + 90mnt all opr Rp.223,200,;XD60H (60) HOTROD 3GB 30HARI Rp.54,100,;AXD300H (300) Axis BRONET 300MB,24Jam 7hr Rp.10,325,;XDH800H (800) XL 800MB 30hr 2/3/4G 24jam Rp.26,900,;AX5H (5000) AXIS 5RB Rp.5,850,;XR5H (5000) XLCOM REGULER 5RB Rp.5,900,;AX10H (10000) AXIS 10RB Rp.10,925,;XNL20H (10000) XL Nelpon Hemat ke Luar Negeri 20Menit ,1Hari Rp.7,900,;XNO7H (10000) XL Nelp 350menit (Sesama XL)+50menit Opr Lain Rp.10,800,;XR10H (10000) XLCOM REGULER 10RB Rp.10,990,;XT10H (10000) XL TRANSFER 10RB Rp.11,000,;AX15H (15000) AXIS 15RB Rp.15,175,;XN200H (15000) XL Kapan aja Nelp 200menit ,14Hari Rp.14,400,;XR15H (15000) XLCOM REGULER 15RB Rp.15,150,;XT15H (15000) XL TRANSFER 15RB Rp.15,700,;XT20H (20000) XL TRANSFER 20RB Rp.20,700,;AX25H (25000) AXIS 25RB Rp.25,100,;XNL80H (25000) XL Nelpon Hemat ke Luar Negeri 80Menit ,7Hari Rp.23,300,;XR25H (25000) XLCOM REGULER 25RB Rp.24,875,;XT25H (25000) XL TRANSFER 25RB Rp.25,500,;AX30H (30000) AXIS 30RB Rp.29,900,;XN500H (30000) XL Kapan aja Nelp 500menit ,30Hari Rp.32,300,;XNS200H (30000) XL Nelp&SMS 200menit + 400SMS ,30Hari Rp.32,300,;XR30H (30000) XLCOM REGULER 30RB Rp.29,800,;XT30H (30000) XL TRANSFER 30RB Rp.30,500,;AX50H (50000) AXIS 50RB Rp.49,525,;XR50H (50000) XLCOM REGULER 50RB Rp.49,600,;XT50H (50000) XL TRANSFER 50RB Rp.50,350,;AXDO12H (67000) BRONET OWSEM 3GB+9GB(4G)+12GB (Games+musik) Rp.68,025,;XNO30H (70000) XL Nelp 300menit ke Semua Operator ,30Hari Rp.66,000,;AX100H (100000) AXIS 100RB Rp.98,650,;AXDT300H (100000) 4G OWSEM 80GB + UNLIMITED GAMES 30hr Rp.94,800,;XD120H (100000) HOTROD 6GB 30HARI Rp.89,800,;XR100H (100000) XLCOM REGULER 100RB Rp.98,975,;XT100H (100000) XL TRANSFER 100RB Rp.99,450,;XR150H (150000) Axis / XL REGULER 150RB Rp.149,900,;AX200H (200000) AXIS 200RB Rp.198,500,;XR200H (200000) XLCOM REGULER 200RB Rp.197,525,;AX300H (300000) AXIS REGULER 300K Rp.297,500,;XR500H (500000) Axis / XL REGULER 500RB Rp.496,575;Deposit lebih cepat dengan menggunakan Deposit 24 jam."
 	};

 	var result_data = await filterPricelist(output.keterangan);
    //console.log(filterPricelist(output.keterangan));
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
        
        var new_transection = new Transection({
        	Type: "payElectricityBill",
        	response: result
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
			        result:result
			    });
		    }
		});
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
filterPricelist = (array) => {
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
}
