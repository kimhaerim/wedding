import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entity';
import { CategoryRepository } from './repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService, CategoryRepository],
})
export class CategoryModule {}
