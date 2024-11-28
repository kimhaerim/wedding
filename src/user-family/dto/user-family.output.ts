import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Relation } from '../enum';

@ObjectType()
export class UserFamilyOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Relation)
  relation: Relation;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isDecease: boolean;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  accountNumber?: string;

  @Field(() => String, { nullable: true })
  bank?: string;

  @Field(() => String)
  accountHolder: string;
}
