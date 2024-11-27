import { Query, Resolver } from '@nestjs/graphql';

import { CoupleService } from './couple.service';
import { CoupleOutput } from './dto';
import { Role } from '../common/enum';
import { RequestUser } from '../common/guard/request-user';
import { Roles } from '../common/guard/roles.decorator';
import { IRequestUser } from '../common/interface';

@Resolver()
export class CoupleResolver {
  constructor(private readonly coupleService: CoupleService) {}

  @Roles(Role.USER)
  @Query(() => CoupleOutput, { description: '커플 단일 조회' })
  async couple(@RequestUser() req: IRequestUser) {
    return this.coupleService.getCoupleById(req.coupleId);
  }
}
