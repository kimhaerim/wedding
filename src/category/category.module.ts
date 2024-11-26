import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entity';
import { CategoryRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
  providers: [CategoryResolver, CategoryService, CategoryRepository],
})
export class CategoryModule {}
