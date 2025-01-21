import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryReadModule } from './category-read.module';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { Category } from './entity';
import { CategoryRepository } from './repository';
import { CheckListModule } from '../check-list/check-list.module';
import { CostModule } from '../cost/cost.module';

@Module({
  imports: [
    CheckListModule,
    CostModule,
    CategoryReadModule,
    TypeOrmModule.forFeature([Category]),
  ],
  exports: [CategoryService],
  providers: [CategoryResolver, CategoryService, CategoryRepository],
})
export class CategoryModule {}
