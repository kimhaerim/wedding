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
export class UpdateCostArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

  @Min(1)
  @IsInt()
  @Field(() => Int)
  checkListId: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  amount?: number;

  @IsOptional()
  @IsDateString()
  @Field(() => Date, { nullable: true })
  paymentDate?: Date;

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
