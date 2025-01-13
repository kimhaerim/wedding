import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
@InputType()
export class UpdateCategoryArgs {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsString()
  @Field(() => String, { nullable: true })
  title?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  budgetAmount?: number;
}
