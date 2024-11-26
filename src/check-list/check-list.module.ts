import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CheckListResolver } from './check-list.resolver';
import { CheckListService } from './check-list.service';
import { CheckList } from './entity';
import { CheckListRepository } from './repository';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule, TypeOrmModule.forFeature([CheckList])],
  providers: [CheckListResolver, CheckListService, CheckListRepository],
})
export class CheckListModule {}
