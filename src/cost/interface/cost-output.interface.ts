import { CostType } from '../enum';

export interface ICostOutput {
  id: number;
  title: string;
  categoryId?: number;
  checkListId?: number;
  amount: number;
  paymentDate?: Date;
  memo?: string;
  costType: CostType;
}
