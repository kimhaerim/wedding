import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { IAddCategory } from './interface';
import { CategoryRepository } from './repository';

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

  async getCategories(coupleId: number) {
    return this.categoryRepository.getManyByCoupleId(coupleId);
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

    await this.categoryRepository.add(args);
    return true;
  }
}
