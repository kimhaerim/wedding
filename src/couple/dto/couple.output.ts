import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoupleOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  weddingDate: Date;

  @Field(() => Int, { nullable: true })
  coupleStartDate: Date;
}
