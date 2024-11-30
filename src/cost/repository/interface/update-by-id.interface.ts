import { CostType } from '../../enum';

export interface IUpdateById {
  checkListId?: number;
  amount?: number;
  paymentDate?: Date;
  memo?: string;
  costType?: CostType;
}
