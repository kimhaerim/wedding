import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';

import { Cost } from '../entity';
import { IAdd } from './interface';

export class CostRepository {
  constructor(@InjectRepository(Cost) private repository: Repository<Cost>) {}

  private loader = new DataLoader<number, Cost[]>(
    async (checkListIds: number[]) => {
      const costs = await this.getManyByCheckListIds(checkListIds);

      return checkListIds.map((checkListId) =>
        costs.filter((cost) => cost.checkListId === checkListId),
      );
    },
    { cache: false },
  );

  async getOneById(id: number) {
    return this.repository.findOneBy({ id });
  }

  async getManyByCheckListId(checkListId: number) {
    return this.loader.load(checkListId);
  }

  async add(args: IAdd) {
    return this.repository.save(args);
  }

  private getManyByCheckListIds(checkListIds: number[]) {
    return this.repository.findBy({ checkListId: In(checkListIds) });
  }
}
