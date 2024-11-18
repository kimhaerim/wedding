import { Injectable } from '@nestjs/common';
import { CoupleRepository } from './repository';
import { Couple } from './entity';
import { IAddCouple } from './interface';

@Injectable()
export class CoupleService {
  constructor(private readonly coupleRepository: CoupleRepository) {}

  async getCoupleById(id: number) {
    return this.coupleRepository.getManyById(id);
  }

  async addCouple(args: IAddCouple) {
    return this.coupleRepository.add(args);
  }
}
