import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { IAddCategory } from './interface';
import { CategoryRepository } from './repository';
import { filterValidFields } from '../common/util';
import { IGetCategories } from './repository/interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory(id: number, coupleId: number) {
    const category = await this.categoryRepository.getOneById(id);
    if (category.coupleId !== coupleId) {
      throw new ForbiddenException('조회 권한이 없는 카테고리입니다.');
    }

    return category;
  }

  async getCategories(args: IGetCategories) {
    return this.categoryRepository.getManyByCoupleId(args);
  }

  @Transactional()
  async addCategory(args: IAddCategory) {
    const category = await this.categoryRepository.getOneByTitleAndCoupleId(
      args.title,
      args.coupleId,
    );
    if (category) {
      throw new BadRequestException('이미 추가된 카테고리입니다.');
    }

    const result = await this.categoryRepository.add([args]);
    return result[0];
  }

  @Transactional()
  async addCategories(
    args: { title: string; budgetAmount?: number }[],
    coupleId: number,
  ) {
    const addArgs = args.map((arg) => ({ ...arg, coupleId }));
    await this.categoryRepository.add(addArgs);
    return true;
  }

  async updateCategory(args: {
    id: number;
    coupleId: number;
    title?: string;
    budgetAmount?: number;
  }) {
    const { id, ...updateArgs } = args;
    const checkList = await this.categoryRepository.getOneById(id);
    if (checkList?.coupleId !== args.coupleId) {
      throw new ForbiddenException('수정 권한이 없는 체크리스트입니다.');
    }

    const categoryUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(categoryUpdateArgs).length > 0) {
      await this.categoryRepository.updateById(id, updateArgs);
    }

    return true;
  }
}
