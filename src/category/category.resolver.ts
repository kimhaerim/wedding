import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CategoryService } from './category.service';
import { AddCategoryArgs } from './dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '카테고리 저장' })
  async addCategory(
    @Args() args: AddCategoryArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryService.addCategory({
      ...args,
      userId: req.userId,
    });
  }
}
