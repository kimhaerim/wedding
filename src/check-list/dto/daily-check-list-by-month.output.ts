import { Field, ObjectType } from '@nestjs/graphql';

import { CheckListOutput } from './check-list.output';

@ObjectType()
export class DailyCheckListByMonthOutput {
  @Field(() => String)
  reservedDate: string;

  @Field(() => [CheckListOutput])
  checkLists: CheckListOutput[];
}
