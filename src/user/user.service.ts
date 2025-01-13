import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

import { IAddUser, IUpdateCoupleId, IUpdateUserProfile } from './interface';
import { UserRepository } from './repository';
import { filterValidFields } from '../common/util';
import { CoupleService } from '../couple/couple.service';

@Injectable()
export class UserService {
  private readonly hashSalt = 10;
  private readonly maxCoupleUserCount = 2;

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
    const user = await this.userRepository.getOneByEmail(email);
    if (!user) {
      throw new BadRequestException('존재하지 않는 회원입니다.');
    }

    return user;
  }

  async getUsersByCoupleId(coupleId: number) {
    return this.userRepository.getManyByCoupleId(coupleId);
  }

  async addUser(args: IAddUser) {
    const { password, coupleId, ...rest } = args;
    this.verifyCouple(coupleId);

    const hashedPassword = password
      ? await bcrypt.hash(password, this.hashSalt)
      : undefined;

    return this.userRepository.add({
      ...rest,
      coupleId,
      password: hashedPassword,
    });
  }

  private async verifyCouple(coupleId: number) {
    const coupleUsers = await this.getUsersByCoupleId(coupleId);
    if (coupleUsers.length >= this.maxCoupleUserCount) {
      throw new BadRequestException('이미 커플에 두 명의 사용자가 존재합니다.');
    }
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

  @Transactional()
  async updateCoupleId(args: IUpdateCoupleId) {
    const { requestCoupleId, userId } = args;

    this.verifyCouple(requestCoupleId);
    this.userRepository.updateById(userId, { coupleId: requestCoupleId });
    return true;
  }
}
