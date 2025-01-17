import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@ArgsType()
export class TotalCategoryBudgetArgs {
  @IsOptional()
  @Min(1000)
  @Max(9999)
  @IsInt()
  @Field(() => Int, { nullable: true })
  targetYear?: number;

  @IsOptional()
  @Min(1)
  @Max(12)
  @IsInt()
  @Field(() => Int, { nullable: true })
  targetMonth?: number;
}
