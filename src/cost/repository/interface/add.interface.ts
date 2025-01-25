import { CostType } from '../../enum';

export interface IAdd {
  title: string;
  checkListId: number;
  amount: number;
  paymentDate?: string;
  memo?: string;
  costType?: CostType;
  isIncludeBudget?: boolean;
}
