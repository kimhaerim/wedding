import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Gender } from '../enum';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  id: number;

  coupleId: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  birthday?: string;

  @Field(() => Gender)
  gender: Gender;
}
