import { Router } from "express";
import JWTAuth from "../middleware/JWTAuth.js";

const MessageRouter = new Router();
const auth = new JWTAuth();
const controller = new MessageController();

MessageRouter.get('/messages/:userId', controller.messages)