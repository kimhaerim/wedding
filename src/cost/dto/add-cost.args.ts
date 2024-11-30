import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { CostType } from '../enum';

@ArgsType()
export class AddCostArgs {
  @IsInt()
  @Field(() => Int)
  checkListId: number;

  @IsInt()
  @Field(() => Int)
  amount: number;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  paymentDate?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  memo?: string;

  @IsEnum(CostType)
  @Field(() => CostType, { nullable: true })
  costType: CostType;
}
