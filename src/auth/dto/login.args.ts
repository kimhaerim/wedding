import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  @IsString()
  @Field(() => String)
  password: string;
}
