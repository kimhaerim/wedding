import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity';
import { IAdd, IUpdateById } from './interface';

export class UserRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneByEmail(email: string) {
    const user = await this.repository.findOneBy({ email });
    return user === null ? undefined : user;
  }

  async getManyByCoupleId(coupleId: number) {
    return this.repository.findBy({ coupleId });
  }

  async add(args: IAdd): Promise<User> {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected ? true : false;
  }
}
