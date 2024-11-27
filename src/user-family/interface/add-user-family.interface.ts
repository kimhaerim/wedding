import { Relation } from '../enum';

export interface IAddUserFamily {
  userId: number;
  relation: Relation;
  name: string;
  isDecease: boolean;
  phoneNumber?: string;
  accountNumber?: string;
  bank?: string;
  accountHolder?: string;
}
