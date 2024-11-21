import { CheckListStatus } from '../../enum';

export interface IUpdateById {
  categoryId?: number;
  description?: string;
  reservedDate?: Date;
  completedAt?: string;
  memo?: string;
  status?: CheckListStatus;
}
