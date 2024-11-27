import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoupleOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { nullable: true })
  weddingDate?: Date;

  @Field(() => Date, { nullable: true })
  coupleStartDate?: Date;
}
