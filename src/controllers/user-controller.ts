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

  findByNameOrUserName(req: Request, res: Response) {
    const { name } = req.query;
    userRepository.findByNameOrUserName(name as string, (users) => {
      if (users.length > 0) {
        res.json(users);
      } else {
        res.status(404).send('Nenhum usuário encontrado.');
      }
    });
  }
}

export default new UserController();