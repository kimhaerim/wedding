import { CostType } from '../enum';

export interface IUpdateCost {
  id: number;
  title?: string;
  checkListId: number;
  amount?: number;
  paymentDate?: Date;
  memo?: string;
  costType?: CostType;
  isIncludeBudget?: boolean;
  coupleId: number;
}
