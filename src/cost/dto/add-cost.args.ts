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
  @IsString()
  @Field(() => String)
  title: string;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Field(() => Int, { nullable: true })
  checkListId?: number;

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

  @IsEnum(CostType)
  @Field(() => CostType)
  costType: CostType;
}
