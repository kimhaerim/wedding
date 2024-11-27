import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  AddUserFamilyArgs,
  UpdateUserFamilyArgs,
  UserFamilyOutput,
} from './dto';
import { UserFamilyService } from './user-family.service';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class UserFamilyResolver {
  constructor(private readonly userFamilyService: UserFamilyService) {}

  @Roles(Role.USER)
  @Query(() => [UserFamilyOutput], { description: '가족 전체 조회' })
  async userFamily(@RequestUser() req: IRequestUser) {
    return this.userFamilyService.getUserFamilyByUserId(req.userId);
  }

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

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '가족 정보 수정' })
  async updateUserFamily(
    @Args() args: UpdateUserFamilyArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.userFamilyService.updateUserFamily({
      ...args,
      userId: req.userId,
    });
  }
}
