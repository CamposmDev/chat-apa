import { Router } from "express";
import UserRouter from "./UserRouter.js"
import MessageRouter from "./MessageRouter.js";


const ApiRouter = Router();
ApiRouter.use('/user', UserRouter)
ApiRouter.use('/messages', MessageRouter)


export default ApiRouter;