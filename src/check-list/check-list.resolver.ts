import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CheckListService } from './check-list.service';
import {
  AddCheckListArgs,
  CheckListOutput,
  CheckListsArgs,
  UpdateCheckListArgs,
} from './dto';
import { IdArgs } from '../common/dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
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
    @RequestUser() req: IRequestUser,
  ) {
    return this.checkListService.getCheckLists({
      ...args,
      coupleId: req.coupleId,
    });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '체크리스트 저장' })
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
}
