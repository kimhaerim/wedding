import { ICheckListOutput } from './check-list-output.interface';

export class IDailyCheckListsByMonthOutput {
  reservedDate: string;
  checkLists: ICheckListOutput[];
}
