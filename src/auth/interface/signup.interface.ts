import { Gender } from '../../user/enum';

export interface ISignup {
  email: string;
  password?: string;
  name: string;
  gender: Gender;
  birthday?: string;
  coupleId?: number;
  weddingDate?: Date;
  coupleStartDate?: string;
}
