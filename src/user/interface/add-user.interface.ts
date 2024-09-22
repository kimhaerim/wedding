import { Gender } from '../enum';

export interface IAddUser {
  email: string;
  coupleId?: number;
  password?: string;
  name: string;
  birthDay?: string;
  gender: Gender;
}
