import { Router } from "express";
import UserRouter from "./UserRouter.js"


const ApiRouter = Router();
ApiRouter.use('/user', UserRouter)

export default ApiRouter;