import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoupleResolver } from './couple.resolver';
import { CoupleService } from './couple.service';
import { Couple } from './entity';
import { CoupleRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  exports: [CoupleService],
  providers: [CoupleResolver, CoupleService, CoupleRepository],
})
export class CoupleModule {}
