import express from "express";
import models from "../models/index.js";
// import auth from "../lib/middleware/auth";

const route = express.Router();

// const resource = models['34cca0468b64056e94e81d4cf504192f/model']
const resource = models['users']

// const base = "34cca0468b64056e94e81d4cf504192f/base";
const base = "users";

// 34cca0468b64056e94e81d4cf504192f/middleware

// Create middleware validation

route.get(`/${base}`, resource.find())

route.get(`/${base}/:id`, resource.findOne())

route.post(`/${base}`, resource.insert())

route.put(`/${base}/:id`, resource.updateOne());

route.put(`/${base}`, resource.update());

route.delete(`/${base}/:id`, resource.delete());

export default route;