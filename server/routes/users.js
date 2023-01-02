import express from "express";
import models from "../models";
import auth from "../lib/middleware/auth";

const route = express.Router();

const resource = models['34cca0468b64056e94e81d4cf504192f/model']

// const base = 34cca0468b64056e94e81d4cf504192f/base;

// 34cca0468b64056e94e81d4cf504192f/middleware

// Create middleware validation

route.get(`/${base}`, resource.find())

route.get(`/${base}/:id`, resource.findOne())

route.post(`/${base}`, resource.insert())

route.put(`/${base}/:id`, resource.updateOne());

route.put(`/${base}`, resource.update());

route.delete(`/${base}/:id`, resource.delete());

return route;