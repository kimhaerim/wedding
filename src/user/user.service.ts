import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

import { IAddUser, IUpdateUserProfile } from './interface';
import { UserRepository } from './repository';
import { filterValidFields } from '../common/util';
import { CoupleService } from '../couple/couple.service';

@Injectable()
export class UserService {
  private readonly hashSalt = 10;

  constructor(
    private readonly coupleService: CoupleService,
    private readonly userRepository: UserRepository,
  ) {}

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

  @Transactional()
  async updateUserProfile(args: IUpdateUserProfile) {
    const { id, name, birthday, gender, weddingDate, coupleStartDate } = args;
    const user = await this.getUserById(id);

    await this.coupleService.updateCouple({
      id: user.coupleId,
      weddingDate,
      coupleStartDate,
    });

    const userUpdateArgs = filterValidFields({ name, birthday, gender });
    if (Object.keys(userUpdateArgs).length > 0) {
      await this.userRepository.updateById(id, { name, birthday, gender });
    }

    return true;
  }
}
