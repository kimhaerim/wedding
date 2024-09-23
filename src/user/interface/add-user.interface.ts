import { User } from '../entity';

export type IAddUser = Pick<
  User,
  'email' | 'coupleId' | 'password' | 'name' | 'birthday' | 'gender'
>;
