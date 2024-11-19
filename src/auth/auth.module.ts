import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../common/guard/jwt.strategy';
import { CoupleModule } from '../couple/couple.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
    CoupleModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: '3d' },
    }),
  ],
})
export class AuthModule {}
