import { ForbiddenException, Injectable } from '@nestjs/common';

import { CheckList } from './entity';
import {
  IAddCheckList,
  ICheckListOutput,
  IGetCheckLists,
  IUpdateCheckList,
} from './interface';
import { CheckListRepository } from './repository';
import { filterValidFields } from '../common/util';

@Injectable()
export class CheckListService {
  constructor(private readonly checkListRepository: CheckListRepository) {}

  async getCheckList(id: number, coupleId: number) {
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList?.coupleId !== coupleId) {
      throw new ForbiddenException('권한이 없는 체크리스트입니다.');
    }

    return this.convertCheckListToOutput(checkList);
  }

  async getCheckLists(args: IGetCheckLists) {
    const checkLists = await this.checkListRepository.getMany(args);
    return checkLists.map((checkList) =>
      this.convertCheckListToOutput(checkList),
    );
  }

  private convertCheckListToOutput(checkList: CheckList): ICheckListOutput {
    return { ...checkList, isCompleted: checkList.completedAt ? true : false };
  }

  async addCheckList(args: IAddCheckList) {
    await this.checkListRepository.add(args);
    return true;
  }

  async updateCheckList(args: IUpdateCheckList) {
    const { id, ...updateArgs } = args;
    const checkList = await this.checkListRepository.getOneById(id);
    if (checkList?.coupleId !== args.coupleId) {
      throw new ForbiddenException('수정 권한이 없는 체크리스트입니다.');
    }

    const checkListUpdateArgs = filterValidFields(updateArgs);
    if (Object.keys(checkListUpdateArgs).length > 0) {
      await this.checkListRepository.updateById(id, updateArgs);
    }

    return true;
  }
}
