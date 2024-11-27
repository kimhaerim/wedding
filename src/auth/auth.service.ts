import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Transactional } from 'typeorm-transactional';

import { ISignup } from './interface';
import { Role } from '../common/enum';
import { CoupleService } from '../couple/couple.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly coupleService: CoupleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(
        '가입되지 않은 이메일입니다. 이메일 주소를 확인해주세요.',
      );
    }

    if (!user.password) {
      throw new BadRequestException('소셜로 가입한 계정입니다.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return this.signUserJwt(user.id, user.coupleId);
  }

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

    const user = coupleId
      ? await this.userService.addUser({ ...args, coupleId })
      : await this.addUserWithCouple(args);

    const { accessToken, refreshToken } = this.signUserJwt(
      user.id,
      user.coupleId,
    );
    return { userId: user.id, accessToken, refreshToken };
  }

  private async addUserWithCouple(args: ISignup) {
    const couple = await this.coupleService.addCouple({
      weddingDate: args.weddingDate,
      coupleStartDate: args.coupleStartDate,
    });
    return this.userService.addUser({
      ...args,
      coupleId: couple.id,
    });
  }

  private signUserJwt(userId: number, coupleId: number) {
    const payload = { userId, coupleId, _role: Role.USER };
    const accessToken = this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload, _refresh: true },
      { expiresIn: '365d' },
    );
    return { accessToken, refreshToken };
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
