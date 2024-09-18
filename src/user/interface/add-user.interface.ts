import { Gender } from '../enum';

export interface IAddUser {
  email: string;
  coupleId?: number;
  password?: string;
  name: string;
  birthDay?: Date;
  gender: Gender;
}
