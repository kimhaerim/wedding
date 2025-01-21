import { IPagination } from '../../../common/interface';

export interface IGetManyByCoupleId extends IPagination {
  coupleId: number;
}
