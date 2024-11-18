import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IAddUser } from './interface';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  private readonly hashSalt = 10;

  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) {
      throw new BadRequestException('존재하지 않는 회원입니다.');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }

  async getUsersByCoupleId(coupleId: number) {
    return this.userRepository.getManyByCoupleId(coupleId);
  }

  async addUser(args: IAddUser) {
    const { password, coupleId, ...rest } = args;
    const hashedPassword = password
      ? await bcrypt.hash(password, this.hashSalt)
      : undefined;

    return this.userRepository.add({
      ...rest,
      coupleId,
      password: hashedPassword,
    });
  }
}
