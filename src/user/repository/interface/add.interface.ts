import { Gender } from '../../enum';

export interface IAdd {
  email: string;
  coupleId: number;
  password?: string;
  name: string;
  birthDay?: string;
  gender: Gender;
}
