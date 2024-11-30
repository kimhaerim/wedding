import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CostService } from './cost.service';
import { AddCostArgs } from './dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class CostResolver {
  constructor(private readonly costService: CostService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '비용 추가' })
  async addCost(@Args() args: AddCostArgs, @RequestUser() req: IRequestUser) {
    return this.costService.addCost({ ...args, coupleId: req.coupleId });
  }
}
