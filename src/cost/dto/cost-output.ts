import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CostType } from '../enum';

@ObjectType()
export class CostOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  paymentDate?: Date;

  @Field(() => String, { nullable: true })
  memo?: string;

  @Field(() => CostType)
  costType: CostType;

  @Field(() => Boolean)
  isIncludeBudget: boolean;
}
