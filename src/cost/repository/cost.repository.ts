import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { Repository } from 'typeorm';

import { Cost } from '../entity';
import {
  IAdd,
  IGetMany,
  IGetManyByCheckListId,
  IUpdateById,
} from './interface';

export class CostRepository {
  constructor(@InjectRepository(Cost) private repository: Repository<Cost>) {}

  private loader = new DataLoader<IGetManyByCheckListId, Cost[]>(
    async (args: IGetManyByCheckListId[]) => {
      const uniqueCheckListIds = args.map((arg) => arg.checkListId);
      const costs = await this.getManyByCheckListIds(
        uniqueCheckListIds,
        args[0].coupleId,
      );

      return args.map((arg) =>
        costs.filter((cost) => cost.checkListId === arg.checkListId),
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

  async getManyByCheckListId(checkListId: number, coupleId: number) {
    return this.loader.load({ checkListId, coupleId });
  }

  async getMany(args: IGetMany) {
    const { startDate, endDate, coupleId } = args;
    const builder = this.repository.createQueryBuilder('cost');
    builder
      .leftJoin('cost.checkList', 'checkList')
      .leftJoin('checkList.category', 'category')
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
    const insertResult = await this.repository.save(args);
    return insertResult.id;
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected ? true : false;
  }

  async removeByIds(ids: number[]) {
    const removeResult = await this.repository.delete(ids);
    return removeResult.affected ? true : false;
  }

  private getManyByCheckListIds(checkListIds: number[], coupleId: number) {
    const builder = this.repository
      .createQueryBuilder('cost')
      .leftJoin('cost.checkList', 'checkList')
      .where('checkList.coupleId = :coupleId', { coupleId })
      .andWhere('cost.checkListId IN (:...checkListIds)', { checkListIds });
    return builder.getMany();
  }
}
