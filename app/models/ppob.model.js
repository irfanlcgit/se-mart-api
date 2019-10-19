var sql = require('./db.js');
//Transection object constructor
var Transection = function(transection){
    this.order_id =  order_id;
    this.bill_id =  bill_id;
    this.product_code =  product_code;
    this.area_code =  area_code;
    this.phone =  phone;
    this.customer_id =  customer_id;
    this.period =  period;
    this.payment_method =  payment_method;
    this.value =  value; 
    this.price =  price;
    this.charge =  charge;
    this.profit =  profit;
    this.trx_status =  trx_status;
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