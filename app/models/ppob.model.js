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

Transection.getTransections = function (result) {    
        sql.query("SELECT * FROM transactions", function (err, res) {
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