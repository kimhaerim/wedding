import { BadRequestException, Injectable } from '@nestjs/common';
import { ISignup } from './interface';
import { UserService } from '../user/user.service';
import { Transactional } from 'typeorm-transactional';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Transactional()
  async signup(args: ISignup) {
    const { password, coupleId, ...rest } = args;
    const existsUser = await this.userService.getUserByEmail(rest.email);
    if (existsUser) {
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

    const payload = { userId, userName: rest.name };
    const accessToken = this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload, _refresh: true },
      {
        expiresIn: '365d',
      },
    );

    return { userId, accessToken, refreshToken };
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
