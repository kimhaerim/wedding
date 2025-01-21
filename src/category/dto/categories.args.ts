import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

import { OrderOption } from '../../common/enum';
import { CategoriesOrderBy } from '../enum';

@ArgsType()
export class CategoriesArgs {
  @IsEnum(CategoriesOrderBy)
  @Field(() => CategoriesOrderBy)
  orderBy: CategoriesOrderBy;

  @IsEnum(OrderOption)
  @Field(() => OrderOption)
  orderOption: OrderOption;
}
