import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserFamily } from './entity';
import { UserFamilyRepository } from './repository/user-family.repository';
import { UserFamilyResolver } from './user-family.resolver';
import { UserFamilyService } from './user-family.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserFamily])],
  providers: [UserFamilyResolver, UserFamilyService, UserFamilyRepository],
})
export class UserFamilyModule {}
