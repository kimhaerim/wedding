import { CostType } from '../../enum';

export interface IUpdateById {
  title?: string;
  categoryId?: number;
  checkListId?: number;
  amount?: number;
  paymentDate?: Date;
  memo?: string;
  costType?: CostType;
  isIncludeBudget?: boolean;
}
