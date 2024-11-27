import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AddUserFamilyArgs } from './dto';
import { UserFamilyService } from './user-family.service';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class UserFamilyResolver {
  constructor(private readonly userFamilyService: UserFamilyService) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '가족 정보 등록' })
  async addUserFamily(
    @Args() args: AddUserFamilyArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.userFamilyService.addUserFamily({
      ...args,
      userId: req.userId,
    });
  }
}
