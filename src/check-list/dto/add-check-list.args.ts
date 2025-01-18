import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class AddCheckListArgs {
  @IsOptional()
  @IsInt()
  @Field(() => Int)
  categoryId: number;

  @IsString()
  @Field(() => String)
  description: string;

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
}
