import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  budgetAmount: number;
}
