import { Field, ObjectType } from '@nestjs/graphql';

import { CostOutput } from './cost-output';

@ObjectType()
export class DailyCostsByMonthOutput {
  @Field(() => String)
  paymentDate: string;

  @Field(() => [CostOutput])
  costs: CostOutput[];
}
