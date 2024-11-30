import { CostType } from '../enum';

export interface IAddCost {
  checkListId: number;
  coupleId: number;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
