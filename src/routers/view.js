const express = require('express')
const multer = require('multer')
const mysql = require('../mysql')
const router = express.Router()

const upload = multer({dest: 'uploads/'})

// 차량 번호 전체 조회
router.get('/', (req, res, next)=>{
  res.render('index')

})

router.get('/statistic',async (req,res,next)=>{
  const hist = await mysql.query('countCarHist')
  //res.render('statistic')
  res.send(hist)
})
 
router.param('id', async (req,res,next,value)=>{
  console.log(value)
  try{
     if(!isNaN(value)){
       car = await mysql.query('findCarInfo', value)
      }else{
       car = await mysql.query('findCarInfobyNum', value)
     }
    if(!car){
      const err = new Error('Car not Found.')
      err.statusCode = 404
      throw err
    }
    req.car = car
    next()
  }catch (err) {
    next(err)
  }
})
//차량id기준 info 조회
router.get('/:id',(req, res)=>{
  console.log("/id get each car statics")
  res.send(req.car)
})


//차량 드라이브 이력 조회
router.get('/:id/drivehist', async (req, res)=>{
  try{
    console.log("/id/drivehist : "+req.car[0].CAR_ID )
    const carhist = await mysql.query('getCarHist',req.car[0].CAR_ID )
    console.log(carhist)   
    const resMimeType = req.accepts(['json','html'])
    if(resMimeType === 'json'){
      if(!carhist || !carhist.length){
        res.send("no history")
      }
    res.send(carhist)
    } else if (resMimeType === 'html'){
      //http localhost:3000/users/5 Accept:text/html --print=hHbB
      res.render('index', {
        nickname: req.user.nickname,
        userId: req.params.id,
        //profileImageURL: '/uploads/a0f6a1418a465c5618c661ee9638fe94',
        profileImageURL: `/uploads/${req.user.profileImageKey}`
      })
    }next()
  }catch (err) {
    
  }

})

router.post('/:id/profile', upload.single('profile'), (req, res, next)=>{
  console.log(req.file)
  const { user } = req
  const { filename } = req.file
  user.profileImageKey = filename
  
  res.send(`User profile image uploaded: ${filename}`)
})

module.exports = router
