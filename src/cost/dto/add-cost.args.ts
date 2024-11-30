import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { CostType } from '../enum';

@ArgsType()
export class AddCostArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  checkListId: number;

  @IsInt()
  @Field(() => Int)
  amount: number;

  @IsOptional()
  @IsDateString()
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
