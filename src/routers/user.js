const express = require('express')
const multer = require('multer')
//const drivedb = require('.././sql')
const mysql = require('../mysql')
const router = express.Router()

const upload = multer({dest: 'uploads/'})

const USERS = {
  3: {
    nickname : 'foo',
    profileImageKey: undefined,
  },
  5: {
    nickname : 'bar',
    profileImageKey: undefined,
  },
}


router.get('/', async (req, res, next)=>{
  const car = await mysql.query('getcarList')
  console.log(car)  
  res.send(car)

})
 

router.param('id', async (req,res,next,value)=>{
  try{
    const user = USERS[value]
    if(!user){
      const err = new Error('User not Found.')
      err.statusCode = 404
      throw err
  }
  req.user = user
  next()
  }catch (err) {
    next(err)
  }
})

// /users/[userid]
router.get('/:id',(req, res)=>{
  const resMimeType = req.accepts(['json','html'])
  if(resMimeType === 'json'){
    console.log(`get user id `)
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

router.post('/:id/nickname',(req,res)=>{
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