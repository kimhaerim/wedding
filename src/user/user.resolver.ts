import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IdArgs } from 'src/common/dto';
import { UserService } from './user.service';
import { Roles } from 'src/common/guard/roles.decorator';
import { Role } from 'src/common/enum';
import { RequestUser } from 'src/common/guard/request-user';
import { IRequestUser } from 'src/common/interface';
import { UserOutput } from './dto';

@Resolver(UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.USER)
  @Query(() => UserOutput, { description: '사용자 단일 조회' })
  async user(@RequestUser() req: IRequestUser) {
    return this.userService.getUserById(req.userId);
  }

  @ResolveField(() => UserOutput, {
    nullable: true,
    description: '사용자와 연결된 파트너 조회',
  })
  async partner(@Parent() user: UserOutput) {
    const couple = await this.userService.getUsersByCoupleId(user.coupleId);
    const partner = couple.find((data) => data.id !== user.id);
    if (!partner) {
      return null;
    }

    return this.userService.getUserById(partner.id);
  }
}
