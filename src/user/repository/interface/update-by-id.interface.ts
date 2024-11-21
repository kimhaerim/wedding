import { Gender } from '../../enum';

export interface IUpdateById {
  name?: string;
  birthday?: string;
  gender?: Gender;
}
