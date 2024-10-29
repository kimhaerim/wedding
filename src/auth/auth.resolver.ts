import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginArgs, SignupArgs, SignupOutput, TokenOutput } from './dto';
import { AuthService } from './auth.service';
import { Roles } from '../common/guard/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';

import { RequestUser } from '../common/guard/request-user';
import { IRequestUser } from '../common/interface';
import { Role } from '../common/enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => TokenOutput, { description: '이메일 로그인' })
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args.email, args.password);
  }

  @Mutation(() => SignupOutput, { description: '이메일 회원가입' })
  async signup(@Args() args: SignupArgs) {
    return this.authService.signup(args);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Query(() => String, { description: '인증 테스트' })
  async authTest(@RequestUser() user: Required<IRequestUser>) {
    return '인증 테스트';
  }
}
