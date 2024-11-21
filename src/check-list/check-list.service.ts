import { Injectable } from '@nestjs/common';

import { IAddCheckList } from './interface';
import { CheckListRepository } from './repository';

@Injectable()
export class CheckListService {
  constructor(private readonly checkListRepository: CheckListRepository) {}

  async addCheckList(args: IAddCheckList) {
    await this.checkListRepository.add(args);
    return true;
  }
}
