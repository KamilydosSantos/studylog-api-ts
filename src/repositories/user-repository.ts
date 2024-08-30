import database from './database';
import BaseRepository from './base-repository';
import User from '../models/user';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  findByNameOrUserName(name: string, callback: (users: User[]) => void): void {
    const sql = 'SELECT * FROM users WHERE name LIKE ? OR userName LIKE ? LIMIT 8';
    const params = [`%${name}%`, `%${name}%`];
    database.all(sql, params, (err, rows) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        callback([]);
        return;
      }
      const users = rows as User[];
      callback(users);
    });
  }
}

export default UserRepository;