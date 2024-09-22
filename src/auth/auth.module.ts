import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UserModule],
})
export class AuthModule {}
