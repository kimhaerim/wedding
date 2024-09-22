import { Gender } from '../../user/enum';

export interface ISignup {
  email: string;
  password?: string;
  name: string;
  gender: Gender;
  birthDay?: string;
  coupleId?: number;
  weddingDate?: Date;
  coupleStartDate?: string;
}
