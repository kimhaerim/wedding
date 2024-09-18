import { Field, Int } from '@nestjs/graphql';
import { Gender } from '../enum';

export class UserOutput {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => Gender)
  gender: Gender;
}
