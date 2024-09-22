import { BadRequestException, Injectable } from '@nestjs/common';
import { ISignup } from './interface';
import { UserService } from '../user/user.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  @Transactional()
  async signup(args: ISignup) {
    const { password, coupleId, ...rest } = args;
    const userByEmail = await this.userService.getUserByEmail(rest.email);
    if (userByEmail) {
      throw new BadRequestException('이미 가입된 이메일입니다.');
    }

    if (password) {
      this.validatePassword(password);
    }

    if (!coupleId) {
      // TODO. 커플 생성
    }

    const userId = await this.userService.addUser({
      ...rest,
      coupleId,
      password,
    });

    return { userId, accessToken: '', refreshToken: '' };
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
