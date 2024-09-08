import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserFollows } from '../entities/UserFollows';

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;
      const newUser = await UserService.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send('Erro ao criar o usuário.');
    }
  }

  async findByUserName(req: Request, res: Response): Promise<void> {
    try {
      const { userName } = req.params;
      const user = await UserService.findByUserName(userName);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('Usuário não encontrado.oadisaodiadi');
      }
    } catch (error) {
      res.status(500).send('Erro ao buscar o usuário.');
    }
  }

  async findByNameOrUserName(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.query;
      if (typeof name === 'string') {
        console.log(`Buscando usuários com nome ou userName: ${name}`);
        const users = await UserService.findByNameOrUserName(name);
        if (users.length > 0) {
          res.json(users);
        } else {
          res.status(404).send('Nenhum usuário encontrado.');
        }
      } else {
        res.status(400).send('Nome inválido.');
      }
    } catch (error) {
      res.status(500).send('Erro ao buscar usuários.');
    }
  }

  async getUserFollowers(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const userFollowers = await UserService.getUserFollowers(parseInt(userId));
      if (userFollowers) {
        res.json(userFollowers);
      } else {
        res.status(404).send('Usuário não encontrado.');
      }
    } catch (error) {
      res.status(500).send('Erro ao buscar seguidores do usuário.');
    }
  }
}

export default new UserController();
