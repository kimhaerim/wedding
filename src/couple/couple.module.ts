import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoupleService } from './couple.service';
import { Couple } from './entity';
import { CoupleRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  exports: [CoupleService],
  providers: [CoupleService, CoupleRepository],
})
export class CoupleModule {}
