import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ArgsType()
export class ExistsUserArgs {
  @IsEmail()
  @Field(() => String)
  email: string;
}
