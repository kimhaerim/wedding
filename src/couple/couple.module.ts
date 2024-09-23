import { Module } from '@nestjs/common';
import { CoupleService } from './couple.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from './entity';
import { CoupleRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Couple])],
  exports: [CoupleService],
  providers: [CoupleService, CoupleRepository],
})
export class CoupleModule {}
