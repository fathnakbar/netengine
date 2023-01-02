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

route.get(`/`, resource.findAll())

route.get(`/:id`, resource.findOne())

route.post(`/`, resource.insert())

route.put(`/:id`, resource.updateOne());

route.put(`/`, resource.update());

route.delete(`/:id`, resource.delete());

export default route;