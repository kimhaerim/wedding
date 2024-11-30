import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CheckListService } from './check-list.service';
import { CheckListOutput } from './dto';
import { CategoryOutput } from '../category/dto';
import { RequestUser } from '../common/guard/request-user';
import { IRequestUser } from '../common/interface';

@Resolver(CategoryOutput)
export class CategoryCheckListResolver {
  constructor(private readonly checkListService: CheckListService) {}

  @ResolveField(() => [CheckListOutput], {
    description: '카테고리에 연결된 체크리스트',
  })
  async checkList(
    @Parent() category: CategoryOutput,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getCheckListByCategoryId(
      category.id,
      req.coupleId,
    );
  }
}
