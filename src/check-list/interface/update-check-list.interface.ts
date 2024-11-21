import { CheckListStatus } from '../enum';

export interface IUpdateCheckList {
  id: number;
  coupleId: number;
  categoryId?: number;
  description?: string;
  reservedDate?: Date;
  completedAt?: string;
  memo?: string;
  status?: CheckListStatus;
}
