import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryCheckListResolver } from './category-check-list.resolver';
import { CheckListResolver } from './check-list.resolver';
import { CheckListService } from './check-list.service';
import { CheckList } from './entity';
import { CheckListRepository } from './repository';
import { CategoryReadModule } from '../category/category-read.module';

@Module({
  imports: [CategoryReadModule, TypeOrmModule.forFeature([CheckList])],
  exports: [CheckListService],
  providers: [
    CheckListResolver,
    CategoryCheckListResolver,
    CheckListService,
    CheckListRepository,
  ],
})
export class CheckListModule {}
