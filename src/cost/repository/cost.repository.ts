import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { Cost } from '../entity';
import { IAdd, IGetMany, IUpdateById } from './interface';

export class CostRepository {
  constructor(@InjectRepository(Cost) private repository: Repository<Cost>) {}

  private loader = new DataLoader<number, Cost[]>(
    async (checkListIds: number[]) => {
      const costs = await this.getManyByCheckListIds(checkListIds);

      return checkListIds.map((checkListId) =>
        costs.filter((cost) => cost.checkListId === checkListId),
      );
    },
    { cache: false },
  );

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getOneWithCheckListById(id: number) {
    return this.repository
      .createQueryBuilder('cost')
      .innerJoinAndSelect('cost.checkList', 'checkList')
      .where('cost.id = :id', { id })
      .getOne();
  }

  async getManyByCheckListId(checkListId: number) {
    return this.loader.load(checkListId);
  }

  async getMany(args: IGetMany) {
    const { startDate, endDate, coupleId } = args;
    const builder = this.repository.createQueryBuilder('cost');
    builder
      .leftJoin('cost.checkList', 'checkList')
      .leftJoin('cost.category', 'category')
      .where(
        '(checkList.coupleId = :coupleId OR category.coupleId = :coupleId)',
        { coupleId },
      );
    builder
      .andWhere('cost.paymentDate IS NOT NULL')
      .andWhere('cost.paymentDate >= :startDate', { startDate })
      .andWhere('cost.paymentDate < :endDate', { endDate });

    return builder.getMany();
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected > 0 ? true : false;
  }

  async removeById(id: number) {
    const removeResult = await this.repository.delete(id);
    return removeResult.affected > 0 ? true : false;
  }

  private getManyByCheckListIds(checkListIds: number[]) {
    return this.repository.findBy({ checkListId: In(checkListIds) });
  }
}
