import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository, SelectQueryBuilder } from 'typeorm';

import { Category } from '../entity';
import {
  IAdd,
  IGetBudgetSumOutput,
  IGetCategoryBudgetDetails,
  IGetManyByCoupleId,
  IGetTotalCategoryBudget,
  IUpdateById,
} from './interface';
import { OrderOption } from '../../common/enum';
import { CategoriesOrderBy } from '../enum';

export class CategoryRepository {
  private loader = new DataLoader<
    IGetCategoryBudgetDetails,
    IGetBudgetSumOutput | undefined
  >(
    async (args: IGetCategoryBudgetDetails[]) => {
      const result = await this.getBudgetSum(
        args.map((arg) => arg.id),
        args[0].coupleId,
      );

      return args.map((arg) => result.find((data) => data.id === arg.id));
    },
    { cache: false },
  );

  private categoryLoader = new DataLoader<number, Category | undefined>(
    async (ids: number[]) => {
      const result = await this.repository.findBy({ id: In(ids) });
      return ids.map((id) => result.find((data) => data.id === id));
    },
    { cache: false },
  );

  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async getOneById(id: number) {
    return this.categoryLoader.load(id);
  }

  async getOneByTitleAndCoupleId(title: string, coupleId: number) {
    return this.repository.findOneBy({ title, coupleId });
  }

  async getOneWithCheckLists(id: number) {
    const builder = this.repository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.checkLists', 'checkLists')
      .leftJoinAndSelect('checkLists.costs', 'costs');
    return builder.andWhere('category.id = :id', { id }).getOne();
  }

  async getManyByCoupleId(args: IGetManyByCoupleId) {
    const { coupleId, offset, limit, orderBy, orderOption } = args;
    const builder = this.repository
      .createQueryBuilder('category')
      .where('category.coupleId = :coupleId', { coupleId })
      .offset(offset)
      .limit(limit);
    if (orderBy && orderOption) {
      this.buildOrder(builder, orderBy, orderOption);
    }

    return builder.getMany();
  }

  private buildOrder(
    builder: SelectQueryBuilder<Category>,
    orderBy: CategoriesOrderBy,
    orderOption: OrderOption,
  ) {
    switch (orderBy) {
      case CategoriesOrderBy.CREATED_AT:
        return builder.orderBy('id', orderOption);
    }
  }

  async getCategoryBudgetDetails(args: IGetCategoryBudgetDetails) {
    return this.loader.load(args);
  }

  async getTotalCategoryBudget(
    args: IGetTotalCategoryBudget,
  ): Promise<IGetBudgetSumOutput | undefined> {
    const { coupleId, startDate, endDate } = args;
    const builder = this.createBaseBuilderAndJoin();
    builder
      .select([
        'SUM(category.budgetAmount) AS budgetAmount',
        'SUM(costs.amount) AS totalCost',
        'SUM(CASE WHEN costs.paymentDate IS NULL OR costs.paymentDate >= CURDATE() THEN costs.amount ELSE 0 END) AS paidCost',
      ])
      .andWhere('category.coupleId = :coupleId', { coupleId })
      .andWhere('costs.isIncludeBudget = 1')
      .groupBy('category.coupleId');

    if (startDate && endDate) {
      builder
        .andWhere('costs.paymentDate >= :startDate', { startDate })
        .andWhere('costs.paymentDate < :endDate', { endDate });
    }

    return builder.getRawOne();
  }

  async add(args: IAdd[]) {
    const insertResult = await this.repository.insert(args);
    return insertResult.identifiers.map((data) => data.id);
  }

  async updateById(id: number, updateArgs: IUpdateById) {
    const updateResult = await this.repository.update(id, updateArgs);
    return updateResult.affected ? true : false;
  }

  async removeById(id: number) {
    const removeResult = await this.repository.delete(id);
    return removeResult.affected ? true : false;
  }

  private createBaseBuilderAndJoin() {
    return this.repository
      .createQueryBuilder('category')
      .innerJoin('category.checkLists', 'checkLists')
      .innerJoin('checkLists.costs', 'costs');
  }

  private async getBudgetSum(ids: number[], coupleId: number) {
    const builder = this.createBaseBuilderAndJoin();
    builder
      .select([
        'category.id AS id',
        'category.budgetAmount AS budgetAmount',
        'SUM(costs.amount) AS totalCost',
        'SUM(CASE WHEN costs.paymentDate IS NULL OR costs.paymentDate >= CURDATE() THEN costs.amount ELSE 0 END) AS paidCost',
      ])
      .andWhere('costs.isIncludeBudget = 1')
      .andWhere('category.coupleId = :coupleId', { coupleId })
      .andWhere('category.id IN (:...ids)', { ids })
      .groupBy('category.id');

    const result = await builder.getRawMany();
    return result.map((data) => ({
      id: data.id,
      budgetAmount: +data.budgetAmount,
      totalCost: +data.totalCost,
      paidCost: +data.paidCost,
    }));
  }
}
