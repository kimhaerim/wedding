import { Role } from '../enum/role.enum';

export interface IRequestUser {
  userId: number;
  coupleId: number;
  role: Role;
}
