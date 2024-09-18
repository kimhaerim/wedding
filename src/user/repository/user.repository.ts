import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity';
import { Repository } from 'typeorm';
import { IAdd } from './interface';

export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
