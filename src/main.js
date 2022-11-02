//@ts-check
//const fs = require("fs")
const express = require("express")
// const mysql = require('mysql');
// const dbconfig = require('../config/database.js')
// const connection = mysql.createConnection(dbconfig)

// connection.connect(function(err){
//   if (err) throw err;
//   console.log('DB Connected')
// });

const app = express()
const PORT = 3000
app.use(express.json())
app.set('views','src/views')
app.set('view engine','pug')

//app.get('/', (req, res) => {
  // connection.query('SELECT * from car_info', (error, rows) => {
  //   if (error) throw error;
  //   console.log('car info is: ', rows);
  //   res.send(rows);
  // });
  // connection.end();
//  res.send("root경로")
//});

const {swaggerUi, specs} = require('./swagger')
const userRouter = require('./routers/user')
const carRouter = require('./routers/car')
const viewRouter = require('./routers/view')

app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('uploads'))
//app.use('/users', userRouter)
app.use('/cars', carRouter)
app.use('/', viewRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((err, req, res, next)=>{
  //에러 핸들링
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})


app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)   
})
