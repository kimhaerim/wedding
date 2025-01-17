import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class DailyCostsByMonthArgs {
  @Min(1000)
  @Max(9999)
  @IsInt()
  @Field(() => Int)
  targetYear: number;

  @Min(1)
  @Max(12)
  @IsInt()
  @Field(() => Int)
  targetMonth: number;
}
