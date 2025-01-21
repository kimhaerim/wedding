import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CategoryReadService } from './category-read.service';
import { CategoryService } from './category.service';
import {
  AddCategoryArgs,
  CategoryBudgetDetailsOutput,
  CategoryOutput,
  TotalCategoryBudgetArgs,
  UpdateCategoryArgs,
} from './dto';
import { IdArgs, PaginationArgs } from '../common/dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver(CategoryOutput)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryReadService: CategoryReadService,
  ) {}

  @Roles(Role.USER)
  @Query(() => CategoryOutput, { description: '카테고리 단일 조회' })
  async category(@Args() args: IdArgs, @RequestUser() req: IRequestUser) {
    return this.categoryReadService.getCategory(args.id, req.coupleId);
  }

  @Roles(Role.USER)
  @Query(() => [CategoryOutput], { description: '카테고리 목록 조회' })
  async categories(
    @Args() paginationArgs: PaginationArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryReadService.getCategories({
      ...paginationArgs,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Query(() => CategoryBudgetDetailsOutput, {
    description: '예산 / 지출 내역 조회',
    nullable: true,
  })
  async totalCategoryBudget(
    @Args() args: TotalCategoryBudgetArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryReadService.getTotalCategoryBudget({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Int, { description: '카테고리 저장' })
  async addCategory(
    @Args() args: AddCategoryArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryService.addCategory({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '카테고리 저장' })
  async addCategories(
    @Args('categories', { type: () => [AddCategoryArgs] })
    args: AddCategoryArgs[],
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryService.addCategories(args, req.coupleId);
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '카테고리 수정' })
  async updateCategory(
    @Args() args: UpdateCategoryArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryService.updateCategory({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '카테고리 삭제' })
  async removeCategory(@Args() args: IdArgs, @RequestUser() req: IRequestUser) {
    return this.categoryService.removeCategoryById(args.id, req.coupleId);
  }

  @Roles(Role.USER)
  @ResolveField(() => CategoryBudgetDetailsOutput, {
    description: '카테고리 별 예산/지출 내역',
    nullable: true,
  })
  async categoryBudgetDetails(
    @Parent() category: CategoryOutput,
    @RequestUser() req: IRequestUser,
  ) {
    return this.categoryReadService.getCategoryBudgetDetails(
      category.id,
      req.coupleId,
    );
  }
}
