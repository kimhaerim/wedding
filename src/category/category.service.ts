import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { IAddCategory } from './interface';
import { CategoryRepository } from './repository';
import { UserService } from '../user/user.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly userService: UserService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getCategory(id: number, userId: number) {
    const user = await this.userService.getUserById(userId);
    const category = await this.categoryRepository.getOneById(id);
    if (category.coupleId !== user.coupleId) {
      throw new ForbiddenException('조회 권한이 없는 카테고리입니다.');
    }

    return category;
  }

  async getCategories(userId: number) {
    const user = await this.userService.getUserById(userId);
    return this.categoryRepository.getManyByCoupleId(user.coupleId);
  }

  @Transactional()
  async addCategory(args: IAddCategory) {
    const { userId, title, budgetAmount } = args;
    const user = await this.userService.getUserById(userId);
    const checkListCategory =
      await this.categoryRepository.getOneByCategoryAndCoupleId(
        title,
        user.coupleId,
      );
    if (checkListCategory) {
      throw new BadRequestException('이미 추가된 카테고리입니다.');
    }

    await this.categoryRepository.add({
      title,
      coupleId: user.coupleId,
      budgetAmount,
    });

    return true;
  }
}
