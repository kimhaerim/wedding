import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity';
import { UserRepository } from './repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CoupleModule } from '../couple/couple.module';

@Module({
  imports: [CoupleModule, TypeOrmModule.forFeature([User])],
  exports: [UserService],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule {}
