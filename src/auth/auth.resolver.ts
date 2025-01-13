import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import {
  ExistsUserArgs,
  LoginArgs,
  SignupArgs,
  SignupOutput,
  TokenOutput,
} from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async existsUser(@Args() args: ExistsUserArgs) {
    return this.authService.existsUser(args.email);
  }

  @Query(() => TokenOutput, { description: '이메일 로그인' })
  async login(@Args() args: LoginArgs) {
    return this.authService.login(args.email, args.password);
  }

  @Mutation(() => SignupOutput, { description: '이메일 회원가입' })
  async signup(@Args() args: SignupArgs) {
    return this.authService.signup(args);
  }
}
