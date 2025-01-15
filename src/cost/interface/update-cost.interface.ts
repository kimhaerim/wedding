import { CostType } from '../enum';

export interface IUpdateCost {
  id: number;
  title?: string;
  categoryId?: number;
  checkListId?: number;
  amount?: number;
  paymentDate?: Date;
  memo?: string;
  costType?: CostType;
  coupleId: number;
}
