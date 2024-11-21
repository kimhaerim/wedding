import { CheckListStatus } from '../enum';

export class ICheckListOutput {
  id: number;
  description: string;
  reservedDate?: Date;
  isCompleted: boolean;
  memo?: string;
  status?: CheckListStatus;
}
