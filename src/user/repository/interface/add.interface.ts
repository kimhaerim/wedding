import { Gender } from '../../enum';

export interface IAdd {
  email: string;
  coupleId: number;
  password?: string;
  name: string;
  birthday?: string;
  gender: Gender;
}
