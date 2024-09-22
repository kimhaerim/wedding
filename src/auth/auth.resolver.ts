import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignupArgs, SignupOutput } from './dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignupOutput, { description: '이메일 회원가입' })
  async signup(@Args() signupArgs: SignupArgs) {
    return this.authService.signup(signupArgs);
  }
}
