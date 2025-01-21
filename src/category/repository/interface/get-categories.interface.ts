import { OrderOption } from '../../../common/enum';
import { IPagination } from '../../../common/interface';
import { CategoriesOrderBy } from '../../enum';

export interface IGetCategories extends IPagination {
  orderBy: CategoriesOrderBy;
  orderOption: OrderOption;
  coupleId: number;
}
