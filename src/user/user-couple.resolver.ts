import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UserOutput } from './dto';
import { UserService } from './user.service';
import { CoupleOutput } from '../couple/dto';

@Resolver(CoupleOutput)
export class UserCoupleResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => [UserOutput], {
    nullable: true,
    description: '사용자와 연결된 파트너 조회',
  })
  async partners(@Parent() couple: CoupleOutput) {
    return this.userService.getUsersByCoupleId(couple.id);
  }
}
