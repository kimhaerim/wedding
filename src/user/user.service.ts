import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

import { IAddUser } from './interface';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  private readonly hashSalt = 10;

  constructor(private readonly userRepository: UserRepository) {}

  async addUser(args: IAddUser) {
    const { password, coupleId, ...rest } = args;
    const hashedPassword = password
      ? await bcrypt.hash(password, this.hashSalt)
      : undefined;

    const user = await this.userRepository.add({
      ...rest,
      coupleId,
      password: hashedPassword,
    });
    return user.id;
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }
}
