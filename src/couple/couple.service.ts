import { Injectable } from '@nestjs/common';

import { IAddCouple, IUpdateCouple } from './interface';
import { CoupleRepository } from './repository';
import { filterValidFields } from '../common/util';

@Injectable()
export class CoupleService {
  constructor(private readonly coupleRepository: CoupleRepository) {}

  async getCoupleById(id: number) {
    return this.coupleRepository.getManyById(id);
  }

  async addCouple(args: IAddCouple) {
    return this.coupleRepository.add(args);
  }

  async updateCouple(args: IUpdateCouple) {
    const { id, ...updateArgs } = args;
    const updateData = filterValidFields(updateArgs);
    if (Object.keys(updateData).length === 0) {
      return true;
    }

    return this.coupleRepository.updateById(id, updateData);
  }
}
