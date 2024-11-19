import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity';
import { IAdd } from './interface';
import { Gender } from '../enum';

export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async getManyByCoupleId(coupleId: number) {
    return this.repository.findBy({ coupleId });
  }

  async add(args: IAdd): Promise<User> {
    return this.repository.save(args);
  }

  async updateById(
    id: number,
    args: { name?: string; birthday?: string; gender?: Gender },
  ) {
    return this.repository.update(id, args);
  }
}
