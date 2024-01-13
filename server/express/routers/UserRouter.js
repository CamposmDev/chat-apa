import { Router } from 'express';
import { UserController} from "../controllers/index.js"

const UserRouter = new Router();

const controller = new UserController()

UserRouter.post('/register', controller.createUser);
UserRouter.post('/login', controller.loginUser)

export default UserRouter;