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

Transection.getCountTransections = function (transectionData, result) {
        if(transectionData.dateFrom&&transectionData.dateTo){
            var query = `SELECT COUNT(*) AS total FROM transactions JOIN bills ON transactions.bill_id = bills.id WHERE bills.name="${transectionData.bill}" AND transactions.created_at>="${transectionData.dateFrom} 00:00:01" AND transactions.created_at<="${transectionData.dateTo} 23:59:59"`;
        }
        else if(transectionData.orderNo){
            var query = `SELECT COUNT(*) AS total FROM transactions JOIN bills ON transactions.bill_id = bills.id WHERE bills.name="${transectionData.bill}" AND order_id="${transectionData.orderNo}"`;
       }else{
            var query = `SELECT COUNT(*) AS total FROM transactions JOIN bills ON transactions.bill_id = bills.id WHERE bills.name="${transectionData.bill}" `;
       }

        sql.query(query, function (err, res) {
            if(err) {
                //console.log("error: ", err);
                result(err.sqlMessage, null);
            }
            else{
                result(null, res[0].total);
            }
        });           
};

Transection.getTransections = function (transectionData, result) {
       
       if(transectionData.dateFrom&&transectionData.dateTo){
            var query = `SELECT transactions.*, products.name as product_name, products.provider as product_provider FROM transactions JOIN bills ON transactions.bill_id = bills.id LEFT JOIN products ON bills.id = products.bill_id WHERE bills.name="${transectionData.bill}" AND transactions.created_at>="${transectionData.dateFrom} 00:00:01" AND transactions.created_at<="${transectionData.dateTo} 23:59:59" LIMIT ${transectionData.offset}, ${transectionData.limit}`;
        }
        else if(transectionData.orderNo){
            //var query = "SELECT transactions.* FROM transactions JOIN bills ON transactions.bill_id = bills.id WHERE bills.name='"+transectionData.bill+"' AND order_id= LIMIT 0, 1";
            var query = `SELECT transactions.*, products.name as product_name, products.provider as product_provider FROM transactions JOIN bills ON transactions.bill_id = bills.id LEFT JOIN products ON bills.id = products.bill_id WHERE bills.name="${transectionData.bill}"  AND order_id="${transectionData.orderNo}" LIMIT ${transectionData.offset}, ${transectionData.limit}`;
       }else{
            var query = `SELECT transactions.*, products.name as product_name, products.provider as product_provider FROM transactions JOIN bills ON transactions.bill_id = bills.id LEFT JOIN products ON bills.id = products.bill_id WHERE bills.name="${transectionData.bill}" LIMIT ${transectionData.offset}, ${transectionData.limit}`;
       } 
//console.log("query=>", query);
        sql.query(query, function (err, res) {
            if(err) {
                //console.log("error: ", err);
                result(err.sqlMessage, null);
            }
            else{
                result(null, res);
            }
        });           
};


Transection.getTransection = function (transectionData, result) {
       
        var query = `SELECT transactions.* FROM transactions JOIN bills ON transactions.bill_id = bills.id WHERE order_id="${transectionData.orderNo}"`;
       
        sql.query(query, function (err, res) {
            if(err) {
                //console.log("error: ", err);
                result(err.sqlMessage, null);
            }
            else{
                result(null, res[0]);
            }
        });           
};


module.exports= Transection;