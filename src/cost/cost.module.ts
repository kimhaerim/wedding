import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostCheckListResolver } from './cost-check-list.resolver';
import { CostResolver } from './cost.resolver';
import { CostService } from './cost.service';
import { Cost } from './entity';
import { CostRepository } from './repository';
import { CheckListModule } from '../check-list/check-list.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule, CheckListModule, TypeOrmModule.forFeature([Cost])],
  providers: [CostResolver, CostCheckListResolver, CostService, CostRepository],
})
export class CostModule {}
