import { IPagination } from '../../common/interface';

export interface IGetCheckLists extends IPagination {
  coupleId: number;
  isCompleted?: boolean;
}
