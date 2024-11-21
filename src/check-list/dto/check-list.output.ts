import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CheckListStatus } from '../enum';

@ObjectType()
export class CheckListOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  description: string;

  @Field(() => Date, { nullable: true })
  reservedDate?: Date;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => String, { nullable: true })
  memo?: string;

  @Field(() => CheckListStatus, { nullable: true })
  status?: CheckListStatus;
}
