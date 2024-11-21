import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CheckListService } from './check-list.service';
import { AddCheckListArgs, UpdateCheckListArgs } from './dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class CheckListResolver {
  constructor(private readonly checkListService: CheckListService) {}

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
