import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryReadService } from './category-read.service';
import { Category } from './entity';
import { CategoryRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryReadService],
  providers: [CategoryReadService, CategoryRepository],
})
export class CategoryReadModule {}
