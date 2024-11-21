import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CheckList } from '../entity';
import { IAdd, IGetMany, IUpdateById } from './interface';

export class CheckListRepository {
  constructor(
    @InjectRepository(CheckList) private repository: Repository<CheckList>,
  ) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getMany(args: IGetMany) {
    const { coupleId, isCompleted } = args;
    const builder = this.repository
      .createQueryBuilder('checkList')
      .where('checkList.coupleId = :coupleId', { coupleId });

    if (isCompleted !== undefined) {
      const condition = isCompleted ? 'IS NOT NULL' : 'IS NULL';
      builder.andWhere(`checkList.completedAt ${condition}`);
    }

    return builder.getMany();
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected > 0 ? true : false;
  }
}
