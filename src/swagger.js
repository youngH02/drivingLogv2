const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition:{
    info:{
      title: 'Driving Log Test API',
      version: '1.0.0'
,

description:  'test API'  },
    host: '124.49.91.86:8002',
    basePath:'/'
  },
  apis: ['./swagger/*','./routers/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = {
  swaggerUi,
  specs
}