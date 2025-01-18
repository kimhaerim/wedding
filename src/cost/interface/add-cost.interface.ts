import { CostType } from '../enum';

export interface IAddCost {
  title: string;
  checkListId: number;
  coupleId: number;
  amount: number;
  paymentDate?: string;
  memo?: string;
  costType?: CostType;
  isIncludeBudget?: boolean;
}
