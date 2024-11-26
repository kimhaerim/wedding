import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckListCountOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  completedCount: number;

  @Field(() => Int)
  incompleteCount: number;
}
