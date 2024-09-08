import { Like, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../database/data-source";
import { UserFollows } from "../entities/UserFollows";

export class UserRepository {
  private repository: Repository<User>;
  private userFollowsRepository: Repository<UserFollows>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
    this.userFollowsRepository = AppDataSource.getRepository(UserFollows);
  }

  async createUser(user: Partial<User>): Promise<User> {
    try {
      const newUser = this.repository.create(user);
      return await this.repository.save(newUser);
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
      throw new Error('Erro ao criar o usuário.');
    }
  }

  async findByUserName(userName: string): Promise<User | null> {
    try {
      return await this.repository.findOneBy({ userName });
    } catch (error) {
      console.error('Erro ao buscar o usuário pelo userName:', error);
      throw new Error('Erro ao buscar o usuário.');
    }
  }

  async findByNameOrUserName(name: string): Promise<User[]> {
    try {
      return await this.repository.find({
        where: [
          { name: Like(`%${name}%`) },
          { userName: Like(`%${name}%`) }
        ],
        take: 8
      });
    } catch (error) {
      console.error('Erro ao buscar usuários pelo nome ou userName:', error);
      throw new Error('Erro ao buscar usuários.');
    }
  }

  async getUserFollowers(userId: number): Promise<User[]> {
    try {
      const user = await this.repository.findOne({
        relations: ['follower'],
        where: { id: userId }
      });

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
      
      return user?.follower?.map(follower => follower.follower) || [];
    } catch (error) {
      console.error('Erro ao buscar seguidores do usuário:', error);
      throw new Error('Erro ao buscar seguidores.');
    }
  }
}