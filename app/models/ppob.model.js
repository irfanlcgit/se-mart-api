var sql = require('./db.js');
//Transection object constructor
var Transection = function(transection){
    this.order_id =  transection.order_id;
    this.bill_id =  transection.bill_id;
    this.product_code =  transection.product_code;
    this.area_code =  transection.area_code;
    this.phone =  transection.phone;
    this.customer_id =  transection.customer_id;
    this.period =  transection.period;
    this.payment_method =  transection.payment_method;
    this.value =  transection.value; 
    this.price =  transection.price;
    this.charge =  transection.charge;
    this.profit =  transection.profit;
    this.trx_status =  transection.trx_status;
    this.created_at = new Date();
    this.updated_at = null;
};

Transection.createTransection = function (newTransection, result) {    
        sql.query("INSERT INTO transactions set ?", newTransection, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err.sqlMessage, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

Transection.getTransections = function (transectionData, result) {
        var toDate_query = "2019-10-19";
        var fromDate_query = "2019-10-20";        
        sql.query("SELECT * FROM transactions WHERE created_at BETWEEN ? AND  ?", [fromDate_query, toDate_query], function (err, res) {
            if(err) {
                //console.log("error: ", err);
                result(err.sqlMessage, null);
            }
            else{
                result(null, res);
            }
        });           
};


module.exports= Transection;