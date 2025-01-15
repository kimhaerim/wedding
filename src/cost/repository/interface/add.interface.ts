import { CostType } from '../../enum';

export interface IAdd {
  title: string;
  categoryId?: number;
  checkListId?: number;
  coupleId: number;
  amount: number;
  paymentDate?: string;
  memo?: string;
  costType: CostType;
}
