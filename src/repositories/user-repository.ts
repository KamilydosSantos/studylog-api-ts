import database from './database';
import BaseRepository from './base-repository';
import User from '../models/user';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }
}

export default UserRepository;