import { InjectRepository } from '@nestjs/typeorm';
import { Couple } from '../entity';
import { Repository } from 'typeorm';
import { IAddCouple } from '../interface';

export class CoupleRepository {
  constructor(
    @InjectRepository(Couple) private repository: Repository<Couple>,
  ) {}

  async getOneById(id: number): Promise<Couple> {
    return this.repository.findOneBy({ id });
  }

  async add(args: IAddCouple): Promise<Couple> {
    return this.repository.save(args);
  }
}
