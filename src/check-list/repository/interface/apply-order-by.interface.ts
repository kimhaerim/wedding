import { SelectQueryBuilder } from 'typeorm';

import { OrderOption } from '../../../common/enum';
import { CheckList } from '../../entity';
import { CheckListOrderBy } from '../../enum';

export interface IApplyOrderBy {
  builder: SelectQueryBuilder<CheckList>;
  orderBy: CheckListOrderBy;
  orderOption: OrderOption;
}
