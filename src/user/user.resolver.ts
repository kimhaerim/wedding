import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { LinkUserToCoupleArgs, UpdateUserProfileArgs, UserOutput } from './dto';
import { UserService } from './user.service';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver(UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.USER)
  @Query(() => UserOutput, { description: '사용자 단일 조회' })
  async user(@RequestUser() req: IRequestUser) {
    return this.userService.getUserById(req.userId);
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '프로필 수정' })
  async updateUserProfile(
    @Args() args: UpdateUserProfileArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.userService.updateUserProfile({ ...args, id: req.userId });
  }

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '커플 연결' })
  async linkUserToCouple(
    @Args() args: LinkUserToCoupleArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.userService.updateCoupleId({
      requestCoupleId: args.coupleId,
      userId: req.userId,
    });
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
