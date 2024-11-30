import { CostType } from '../enum';

export interface IUpdateCost {
  id: number;
  checkListId?: number;
  amount?: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
  coupleId: number;
}
