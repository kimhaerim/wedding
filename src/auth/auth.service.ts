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
  private readonly maxCoupleUserCount = 2;

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

    return this.signUserJwt(user.id);
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

    if (coupleId) {
      await this.verifyCouple(coupleId);
    }

    const user = coupleId
      ? await this.userService.addUser({ ...args, coupleId })
      : await this.addUserWithCouple(args);

    const { accessToken, refreshToken } = this.signUserJwt(user.id);
    return { userId: user.id, accessToken, refreshToken };
  }

  private async verifyCouple(coupleId: number) {
    const couple = await this.coupleService.getCoupleById(coupleId);
    if (!couple) {
      throw new BadRequestException('커플이 존재하지 않습니다.');
    }

    const coupleUsers = await this.userService.getUsersByCoupleId(coupleId);
    if (coupleUsers.length >= this.maxCoupleUserCount) {
      throw new BadRequestException('이미 커플에 두 명의 사용자가 존재합니다.');
    }
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

  private signUserJwt(userId: number) {
    const payload = { userId, _role: Role.USER };
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
