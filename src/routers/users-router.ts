import express from 'express';
import UserController from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.post('/users', UserController.create);
usersRouter.get('/users/search', UserController.findByNameOrUserName);
usersRouter.get('/users/:userName', UserController.findByUserName);

export default usersRouter;