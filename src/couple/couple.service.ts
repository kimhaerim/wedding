import { BadRequestException, Injectable } from '@nestjs/common';

import { IAddCouple, IUpdateCouple } from './interface';
import { CoupleRepository } from './repository';
import { filterValidFields } from '../common/util';

@Injectable()
export class CoupleService {
  constructor(private readonly coupleRepository: CoupleRepository) {}

  async getCoupleById(id: number) {
    const couple = await this.coupleRepository.getOneById(id);
    if (!couple) {
      throw new BadRequestException('존재하지 않는 커플입니다.');
    }

    return couple;
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
