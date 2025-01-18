import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
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
  @IsString()
  @Field(() => String)
  title: string;

  @Min(1)
  @IsInt()
  @Field(() => Int)
  checkListId: number;

  @IsInt()
  @Field(() => Int)
  amount: number;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  paymentDate?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  memo?: string;

  @IsOptional()
  @IsEnum(CostType)
  @Field(() => CostType, { nullable: true })
  costType?: CostType;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isIncludeBudget?: boolean;
}
