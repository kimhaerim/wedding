import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

import { OrderOption } from '../../common/enum';
import { CheckListOrderBy } from '../enum';

@ArgsType()
export class DailyCheckListByMonthArgs {
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

  @IsEnum(CheckListOrderBy)
  @Field(() => CheckListOrderBy)
  orderBy: CheckListOrderBy;

  @IsEnum(OrderOption)
  @Field(() => OrderOption)
  orderOption: OrderOption;
}
