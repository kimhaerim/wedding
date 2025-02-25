import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@ArgsType()
@InputType()
export class AddCategoryArgs {
  @IsString()
  @Field(() => String)
  title: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  budgetAmount?: number;
}
