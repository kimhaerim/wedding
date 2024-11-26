import { OrderOption } from '../../common/enum';
import { CheckListOrderBy } from '../enum';

export interface IGetDailyCheckListsByMonth {
  targetYear: number;
  targetMonth: number;
  coupleId: number;
  orderBy: CheckListOrderBy;
  orderOption: OrderOption;
}
