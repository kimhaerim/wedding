export interface IUpdateUserFamily {
  id: number;
  userId: number;
  name: string;
  isDecease: boolean;
  phoneNumber?: string;
  accountNumber?: string;
  bank?: string;
  accountHolder?: string;
}
