import { Router } from "express";
import JWTAuth from "../middleware/JWTAuth.js";
import { MessageController } from "../controllers/index.js";

const MessageRouter = new Router();
const auth = new JWTAuth();
const controller = new MessageController();

MessageRouter.get('/:userId', auth.verifyJWT, controller.messages)

export default MessageRouter;