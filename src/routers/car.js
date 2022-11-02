const express = require('express')
const mysql = require('../mysql')
const router = express.Router()
const date = new Date()

// 차량 번호 전체 조회
router.get('/', async (req, res, next)=>{
  const carList = await mysql.query('getcarList')
  console.log(carList) 
  res.send(carList)

})
 
router.param('id', async (req,res,next,value)=>{
  console.log(value)
  try{
     if(!isNaN(value)){
       car = await mysql.query('findCarInfo', value)
      }else{
       car = await mysql.query('findCarInfobyNum', value)
     }
    if(!car || !car.length){
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


//주행기록 추가(insert)
router.post('/completeDrive', async (req,res)=>{
  console.log("completeDrive Hist Update page")
  const carinfo = await mysql.query('findCarId', req.body.carNum)

  if(!carinfo || !carinfo.length){
    res.send("no carID regist first")
  }else{
    const reqCarData = {
      CAR_ID : carinfo[0].CAR_ID,
      START_TIME : req.body.startTime,
      END_TIME : req.body.endTime,
      START_POS : req.body.startLatLng,
      END_POS : req.body.endLatLng,
      DISTANCE : Number(req.body.totDistance.toFixed(3)), 
    }
    console.log(reqCarData)
    const reqInsertData= {
      CAR_ID : reqCarData.CAR_ID,
      //START_TIME : reqCarData.START_TIME,
      //END_TIME : reqCarData.END_TIME,
      START_POS : reqCarData.START_POS,
      END_POS : reqCarData.END_POS,
      DISTANCE : reqCarData.DISTANCE,
    }    
    const carhistinsert = await mysql.query('insertDriveHist', reqInsertData)
    //console.log(carhistinsert)
    res.send(`UPDATE ${req.body.carNum}'s drivingLog!!`)
    const reqUpdateStatusData = [{
      CAR_ID : reqCarData.CAR_ID,
      NOW_POS : reqCarData.END_POS,
      TOTAL_DIS : reqCarData.DISTANCE,
     // TOTAL_TIME :,
    },
    reqCarData.DISTANCE,
    {
      CAR_ID : reqCarData.CAR_ID,
      NOW_POS : reqCarData.END_POS, //주소정보 전환
      LAST_UPDATED_DATE : date
    }
  ]
    const updateCarStatus = await mysql.query('updateCarStatus', reqUpdateStatusData)
    
}

})

//차량 드라이브 이력 조회*******
router.get('/:id/drivehist', async (req, res)=>{
  try{
    console.log("/id/drivehist : "+req.car[0].CAR_ID )
    const carhist = await mysql.query('getCarHist',req.car[0].CAR_ID )
    console.log(carhist)   
    const resMimeType = req.accepts(['json','html'])
    if(resMimeType === 'json'){
      if(!carhist){
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

module.exports = router

//날짜치환
//위치좌표 주소 변환
//통계페이지
//등록페이지
//ocr 번호판 처리