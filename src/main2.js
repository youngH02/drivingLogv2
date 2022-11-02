//@ts-check
const fs = require("fs")
const express = require("express")
const { resourceLimits } = require("worker_threads")
const userRouter = express.Router()
const app = express()
const PORT = 3000
app.use(express.json())


// app.post("/",(req,res)=>{
//   res.send("Root-Post")
// })

// app.use('/', async (req, res, next)=>{
//   const requestedAt = new Date()

//   const fileContent = await fs.promises.readFile('text.txt')

//   console.log("middle 1")
//   //@ts-ignore
//   req.requestedAt = requestedAt
//   //@ts-ignore
//   req.fileContent = fileContent
//   next()
//})
app.get('/',(req,res)=>{
	res.render('index',{
    message: 'hello pug!!!',
  })
})

app.use('/stat', (req, res)=>{
  console.log("middele 2")
  //@ts-ignore
  res.send(`hello, Express ${req.requestedAt}, ${req.fileContent}`)
})
// app.use((req, res)=>{
//   console.log("middele 2")
//   //@ts-ignore
//   res.send(`hello, Express ${req.requestedAt}, ${req.fileContent}`)
// })

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('src/uploads'))

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)   
})
app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)   
})