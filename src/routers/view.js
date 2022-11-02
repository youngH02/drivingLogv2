const express = require('express')
const multer = require('multer')

const mysql = require('../mysql')
const router = express.Router()

const upload = multer({dest: 'uploads/'})

router.get('/', async (req, res, next)=>{
  const carList = await mysql.query('getcarList')
  console.log(carList) 
  res.send(carList)

})
 
router.param('id', async (req,res,next,value)=>{
  try{
    const car = await mysql.query('getcarList')
    if(!car){
      const err = new Error('Car not Found.')
      err.statusCode = 404
      throw err
  }
  req.carNum = carNum
  next()
  }catch (err) {
    next(err)
  }
})
router.get('/:id',(req, res)=>{
  const resMimeType = req.accepts(['json','html'])
  if(resMimeType === 'json'){
    //차량 통계정보 조회
    console.log(`get each car statics`)
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html'){
    //http localhost:3000/users/5 Accept:text/html --print=hHbB
    res.render('index', {
      nickname: req.user.nickname,
      userId: req.params.id,
      //profileImageURL: '/uploads/a0f6a1418a465c5618c661ee9638fe94',
      profileImageURL: `/uploads/${req.user.profileImageKey}`
    })
  }
})

router.post('/:id/regi',(req,res)=>{
  //req.body:{"nickname":"bar"}
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`user nickname updated : ${nickname}`)
})

router.post('/:id/profile', upload.single('profile'), (req, res, next)=>{
  console.log(req.file)
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename
  
  res.send(`User profile image uploaded: ${filename}`)
})

module.exports = router