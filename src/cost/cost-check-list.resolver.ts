import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CostService } from './cost.service';
import { CostOutput } from './dto';
import { CheckListOutput } from '../check-list/dto';
import { RequestUser } from '../common/guard/request-user';
import { IRequestUser } from '../common/interface';

@Resolver(CheckListOutput)
export class CostCheckListResolver {
  constructor(private readonly costService: CostService) {}

  @ResolveField(() => [CostOutput], { description: '체크리스트 연결된 비용들' })
  async costs(
    @Parent() checkList: CheckListOutput,
    @RequestUser() req: IRequestUser,
  ) {
    return this.costService.getCostsByCheckListId(checkList.id, req.coupleId);
  }
}
