import express from 'express'
const route = express.Router()

route.get('/', (req, res) => res.send('Hello World! from test.js'))

export default route