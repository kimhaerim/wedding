import { Field, Int, ObjectType } from '@nestjs/graphql';

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
}
