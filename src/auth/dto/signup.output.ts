import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TokenOutput } from './token.output';

@ObjectType()
export class SignupOutput extends TokenOutput {
  @Field(() => Int)
  userId: number;
}
