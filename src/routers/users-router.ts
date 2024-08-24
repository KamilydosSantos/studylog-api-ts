import express from 'express';
import UserRepository from '../repositories/user-repository';
import UserController from '../controllers/user-controller';

const usersRouter = express.Router();

usersRouter.post('/users', UserController.create);

export default usersRouter;