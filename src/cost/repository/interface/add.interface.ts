import { CostType } from '../../enum';

export interface IAdd {
  checkListId: number;
  coupleId: number;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
