import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CheckListService } from './check-list.service';
import {
  AddCheckListArgs,
  CheckListCountArgs,
  CheckListCountOutput,
  CheckListOutput,
  CheckListsArgs,
  DailyCheckListByMonthArgs,
  DailyCheckListByMonthOutput,
  LinkChecklistsToCategoryArgs,
  RemoveCheckListsByCategoryIdArgs,
  UpdateCheckListArgs,
} from './dto';
import { CategoryOutput } from '../category/dto';
import { IdArgs, PaginationArgs } from '../common/dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver(CheckListOutput)
export class CheckListResolver {
  constructor(private readonly checkListService: CheckListService) {}

  @Roles(Role.USER)
  @Query(() => CheckListOutput, { description: '체크리스트 단일 조회' })
  async checkList(@Args() args: IdArgs, @RequestUser() req: IRequestUser) {
    return this.checkListService.getCheckList(args.id, req.coupleId);
  }

  @Roles(Role.USER)
  @Query(() => [CheckListOutput], { description: '체크리스트 목록 조회' })
  async checkLists(
    @Args() args: CheckListsArgs,
    @Args() paginationArgs: PaginationArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getCheckLists({
      ...args,
      ...paginationArgs,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Query(() => [DailyCheckListByMonthOutput], {
    description: '날짜 별로 체크리스트 목록 조회',
  })
  async dailyCheckListByMonth(
    @Args() args: DailyCheckListByMonthArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getDailyCheckListsByMonth({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Query(() => CheckListCountOutput, { description: '체크리스트 개수 조회' })
  async checkListCount(
    @Args() args: CheckListCountArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getCheckListCount({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Int, { description: '체크리스트 저장' })
  async addCheckList(
    @Args() args: AddCheckListArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.addCheckList({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '체크리스트 수정' })
  async updateCheckList(
    @Args() args: UpdateCheckListArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.updateCheckList({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '체크리스트를 카테고리와 연결하기' })
  async linkChecklistsToCategory(
    @Args() args: LinkChecklistsToCategoryArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.updateCategoryIdForCheckLists({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '체크리스트 삭제' })
  async removeCheckList(
    @Args() args: IdArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.removeCheckList(args.id, req.coupleId);
  }

  // @Roles(Role.USER)
  // @Mutation(() => Boolean, { description: '카테고리에 속한 체크리스트 삭제' })
  // async removeCheckListsByCategoryId(
  //   @Args() args: RemoveCheckListsByCategoryIdArgs,
  //   @RequestUser() req: IRequestUser,
  // ) {
  //   return this.checkListService.removeCheckListsByCategoryId(
  //     args.categoryId,
  //     req.coupleId,
  //   );
  // }

  @ResolveField(() => CategoryOutput, {
    description: '체크리스트의 부모 카테고리',
  })
  async categoryByCheckList(
    @Parent() checkList: CheckListOutput,
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getCategoryByCheckList(
      checkList.id,
      req.coupleId,
    );
  }
}
