import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { CheckListStatus } from '../enum';

@ArgsType()
export class UpdateCheckListArgs {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  reservedDate?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  completedAt?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  memo?: string;

  @IsOptional()
  @IsEnum(CheckListStatus)
  @Field(() => CheckListStatus, { nullable: true })
  status?: CheckListStatus;
}
