import express from 'express'
const route = express.Router();

route.get("/", (req, res) => {
    res.send("Hello admin")
})

export default route;