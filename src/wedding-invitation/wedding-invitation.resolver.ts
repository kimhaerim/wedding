import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AddWeddingInvitationArgs } from './dto';
import { WeddingInvitationService } from './wedding-invitation.service';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class WeddingInvitationResolver {
  constructor(
    private readonly weddingInvitationService: WeddingInvitationService,
  ) {}

  @Roles(Role.USER)
  @Mutation(() => Boolean, { description: '청첩장 정보 입력' })
  async addWeddingInvitation(
    @Args() args: AddWeddingInvitationArgs,
    @RequestUser() req: IRequestUser,
  ) {
    return this.weddingInvitationService.addWeddingInvitation({
      ...args,
      coupleId: req.coupleId,
    });
  }
}
