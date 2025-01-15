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
export class UpdateCostArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

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
}
