import { CheckListStatus } from '../../enum';

export interface IAdd {
  coupleId: number;
  categoryId?: number;
  description: string;
  reservedDate?: Date;
  completedAt?: string;
  memo?: string;
  status?: CheckListStatus;
}
