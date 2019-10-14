var sql = require('./db.js');
//Transection object constructor
var Transection = function(transection){
    this.type = transection.Type,
    this.response = JSON.stringify(transection.response),
    this.created_at = new Date();
};

Transection.createTransection = function (newTransection, result) {    
        sql.query("INSERT INTO transections set ?", newTransection, function (err, res) {
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

module.exports= Transection;