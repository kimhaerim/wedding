import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Couple } from '../entity';
import { IAddCouple } from '../interface';

export class CoupleRepository {
  constructor(
    @InjectRepository(Couple) private repository: Repository<Couple>,
  ) {}

  async getManyById(id: number): Promise<Couple[]> {
    return this.repository.findBy({ id });
  }

  async add(args: IAddCouple): Promise<Couple> {
    return this.repository.save(args);
  }

  async updateById(
    id: number,
    args: { weddingDate?: Date; coupleStartDate?: string },
  ) {
    return this.repository.update(id, args);
  }
}
