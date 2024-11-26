import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CheckList } from '../entity';
import { IAdd, IGetMany, IUpdateById } from './interface';

export class CheckListRepository {
  constructor(
    @InjectRepository(CheckList) private repository: Repository<CheckList>,
  ) {}

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getManyByCategoryId(categoryId: number, coupleId: number) {
    return this.repository.find({ where: { categoryId, coupleId } });
  }

  async getManyByIdsAndCoupleId(ids: number[], coupleId: number) {
    return this.repository.find({ where: { id: In(ids), coupleId } });
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

  async updateCategoryIdByIds(ids: number[], categoryId: number) {
    const updateResult = await this.repository.update(ids, { categoryId });
    return updateResult.affected > 0 ? true : false;
  }

  async removeByIds(ids: number[]) {
    const removeResult = await this.repository.delete(ids);
    return removeResult.affected > 0 ? true : false;
  }
}
