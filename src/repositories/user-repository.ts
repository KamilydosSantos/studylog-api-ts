import database from './database';
import BaseRepository from './base-repository';
import User from '../models/user';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  findByNameOrUserName(name: string, callback: (user?: User) => void): void {
    const sql = 'SELECT * FROM users WHERE name LIKE? OR username LIKE? LIMIT 8';
    const params = [`%${name}%`, `%${name}%`];
    database.get(sql, params, (_err, row) => {
      const user = row as User | undefined;
      callback(user);
    });
  }
}

export default UserRepository;