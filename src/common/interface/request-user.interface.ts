import { Role } from '../enum/role.enum';

export interface IRequestUser {
  userId: number;
  role: Role;
}
