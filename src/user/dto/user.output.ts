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

  @Field(() => Date, { nullable: true })
  birthday?: Date;

  @Field(() => Gender)
  gender: Gender;
}
