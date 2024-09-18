import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

import { IAddUser } from './interface';
import { UserRepository } from './repository';

@Injectable()
export class UserService {
  private readonly hashSalt = 10;

  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  async addUser(args: IAddUser) {
    const { password, coupleId, ...rest } = args;
    const userByEmail = await this.userRepository.getOneByEmail(rest.email);
    if (userByEmail) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    if (password) {
      this.validatePassword(password);
    }

    if (!coupleId) {
      // 커플 생성
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, this.hashSalt)
      : undefined;
    const user = await this.userRepository.add({
      ...rest,
      coupleId,
      password: hashedPassword,
    });
    return { ...user, accessToken: '', refreshToken: '' };
  }

  /**
   *
   * @param password
   * 알파벳 + 숫자 + 특수 문자 조합
   */
  private validatePassword(password: string) {
    if (!this.containsAlphabet(password)) {
      throw new BadRequestException('비밀번호가 유효하지 않습니다.');
    }

    if (!this.containsNumber(password)) {
      throw new BadRequestException('비밀번호가 유효하지 않습니다.');
    }

    if (!this.containsSpecialCharacter(password)) {
      throw new BadRequestException('비밀번호가 유효하지 않습니다.');
    }
  }

  private containsAlphabet(password: string): boolean {
    return /[a-zA-Z]/.test(password);
  }

  private containsNumber(password: string): boolean {
    return /\d/.test(password);
  }

  private containsSpecialCharacter(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}
