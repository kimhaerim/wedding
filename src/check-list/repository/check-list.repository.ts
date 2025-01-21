import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { CheckList } from '../entity';
import {
  IAdd,
  IApplyOrderBy,
  IGetCount,
  IGetMany,
  IUpdateById,
} from './interface';
import { OrderOption } from '../../common/enum';
import { CheckListOrderBy } from '../enum';

export class CheckListRepository {
  constructor(
    @InjectRepository(CheckList) private repository: Repository<CheckList>,
  ) {}

  private loader = new DataLoader<number, CheckList | undefined>(
    async (ids: number[]) => {
      const result = await this.repository.findBy({ id: In(ids) });
      return ids.map((id) => result.find((data) => data.id === id));
    },
    { cache: false },
  );

  async getOneById(id: number) {
    return this.loader.load(id);
  }

  async getOneWithCost(id: number) {
    return this.repository
      .createQueryBuilder('checkList')
      .leftJoinAndSelect('checkList.costs', 'costs')
      .where('checkList.id = :id', { id })
      .getOne();
  }

  async getManyByCategoryId(categoryId: number, coupleId: number) {
    return this.repository.find({ where: { categoryId, coupleId } });
  }

  async getManyByIdsAndCoupleId(ids: number[], coupleId: number) {
    return this.repository.find({ where: { id: In(ids), coupleId } });
  }

  async getMany(args: IGetMany) {
    const {
      coupleId,
      categoryId,
      isCompleted,
      startDate,
      endDate,
      orderBy,
      orderOption,
      offset,
      limit,
    } = args;

    const builder = this.createBaseQuery(coupleId);

    if (categoryId) {
      builder.andWhere('checkList.categoryId = :categoryId', { categoryId });
    }

    if (isCompleted !== undefined) {
      const condition = isCompleted ? 'IS NOT NULL' : 'IS NULL';
      builder.andWhere(`checkList.completedAt ${condition}`);
    }

    if (startDate && endDate) {
      builder
        .andWhere('checkList.reservedDate >= :startDate', { startDate })
        .andWhere('checkList.reservedDate < :endDate', { endDate });
    }

    if (orderBy && orderOption) {
      builder.orderBy('checkList.reservedDate', OrderOption.ASC);
      this.applyOrderBy({ builder, orderBy, orderOption });
    }

    return builder.skip(offset).take(limit).getMany();
  }

  private applyOrderBy(args: IApplyOrderBy) {
    const { builder, orderBy, orderOption } = args;
    switch (orderBy) {
      case CheckListOrderBy.CREATED_AT:
        builder.addOrderBy('checkList.id', orderOption);
        break;

      case CheckListOrderBy.COMPLETED_AT:
        builder.addOrderBy('checkList.completedAt', orderOption);
        break;
    }

    return builder;
  }

  async getCount(args: IGetCount) {
    const { startDate, endDate, coupleId } = args;
    const builder = this.createBaseQuery(coupleId);

    builder.select(
      'COUNT(*) AS totalCount, COUNT(CASE WHEN checkList.completedAt IS NULL THEN 1 END) AS incompleteCount, COUNT(CASE WHEN checkList.completedAt IS NOT NULL THEN 1 END) AS completedCount',
    );

    if (startDate && endDate) {
      builder
        .andWhere('checkList.reservedDate >= :startDate', { startDate })
        .andWhere('checkList.reservedDate < :endDate', { endDate });
      builder.groupBy('DATE_FORMAT(checkList.reservedDate, "%Y-%m")');
    }

    const result = await builder.getRawOne();
    return {
      totalCount: +result.totalCount,
      completedCount: +result.completedCount,
      incompleteCount: +result.incompleteCount,
    };
  }

  private createBaseQuery(coupleId: number) {
    return this.repository
      .createQueryBuilder('checkList')
      .where('checkList.coupleId = :coupleId', { coupleId });
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected ? true : false;
  }

  async updateCategoryIdByIds(ids: number[], categoryId: number) {
    const updateResult = await this.repository.update(ids, { categoryId });
    return updateResult.affected ? true : false;
  }

  async removeByIds(ids: number[]) {
    const removeResult = await this.repository.delete(ids);
    return removeResult.affected ? true : false;
  }
}
