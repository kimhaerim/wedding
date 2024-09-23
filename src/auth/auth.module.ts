import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

import * as config from 'config';
import { CoupleModule } from '../couple/couple.module';

@Module({
  providers: [AuthResolver, AuthService],
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
