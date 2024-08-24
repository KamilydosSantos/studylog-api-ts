import { Request, Response } from 'express';
import User from '../models/user';
import UserRepository from '../repositories/user-repository';

const userRepository = new UserRepository();

class UserController {
  create(req: Request, res: Response) {
    const user: User = req.body;
    userRepository.create(user, (id?: number) => {
        if (id) {
            res.status(201).location(`/users/${id}`).send();
        } else {
            res.status(400).send();
        }
    });
  }
}

export default new UserController();