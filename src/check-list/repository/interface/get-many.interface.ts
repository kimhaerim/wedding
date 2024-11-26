import { OrderOption } from '../../../common/enum';
import { CheckListOrderBy } from '../../enum';

export interface IGetMany {
  coupleId: number;
  isCompleted?: boolean;
  startDate?: string;
  endDate?: string;
  orderBy?: CheckListOrderBy;
  orderOption?: OrderOption;
}
