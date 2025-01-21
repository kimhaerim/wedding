import { OrderOption } from '../../../common/enum';
import { IPagination } from '../../../common/interface';
import { CategoriesOrderBy } from '../../enum';

export interface IGetManyByCoupleId extends IPagination {
  orderBy?: CategoriesOrderBy;
  orderOption?: OrderOption;
  coupleId: number;
}
