import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.post('/users', UserController.create);
userRouter.get('/users/search', UserController.findByNameOrUserName);
userRouter.get('/users/:userName', UserController.findByUserName);

export default userRouter;