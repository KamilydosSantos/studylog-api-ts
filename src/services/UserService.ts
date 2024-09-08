import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

class UserService {
  async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = await userRepository.createUser(user);
      return newUser;
    } catch (error) {
      throw new Error('Erro ao criar o usuário.');
    }
  }

  async findByUserName(userName: string): Promise<User | null> {
    try {
      const user = await userRepository.findByUserName(userName);
      return user || null;
    } catch (error) {
      throw new Error('Erro ao buscar o usuário.');
    }
  }

  async findByNameOrUserName(name: string): Promise<User[]> {
    try {
      const users = await userRepository.findByNameOrUserName(name);
      return users;
    } catch (error) {
      throw new Error('Erro ao buscar usuários.');
    }
  }

  async getUserFollowers(userId: number): Promise<User[]> {
    try {
      const followers = await userRepository.getUserFollowers(userId);
      return followers;
    } catch (error) {
      throw new Error('Erro ao buscar seguidores do usuário.');
    }
  }
}

export default new UserService();