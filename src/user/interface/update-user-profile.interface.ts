import { Gender } from '../enum';

export class IUpdateUserProfile {
  id: number;
  name?: string;
  birthday?: string;
  gender?: Gender;
  weddingDate?: Date;
  coupleStartDate?: string;
}
