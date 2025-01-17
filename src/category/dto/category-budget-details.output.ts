import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryBudgetDetailsOutput {
  @Field(() => Int)
  budgetAmount: number;

  @Field(() => Int)
  remainingBudget: number;

  @Field(() => Int)
  totalCost: number;

  @Field(() => Int)
  paidCost: number;

  @Field(() => Int)
  unpaidCost: number;
}
