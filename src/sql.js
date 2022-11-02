const sql = require('mysql')

function getCarInfo2(){
  //const sql = 'select * from car_info'
  console.log("db select")
  connection.query('select * from car_info', (err, rows, fields) => {
    if(err) throw err;
    console.log("db end")
    callback(rows);
    
});
}
function getCarInfo(){
  //const sql = 'select * from car_info'
  console.log("db select")
  connection.query('select * from car_info', (err, rows, fields) => {
    if(err) throw err;
    console.log("db end")
    callback(rows);
    
});
}

module.exports = {
  getCarInfo
}
