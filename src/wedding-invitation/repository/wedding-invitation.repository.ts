import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { weddingInvitation } from '../entity';
import { IAdd } from './interface';

export class WeddingInvitationRepository {
  constructor(
    @InjectRepository(weddingInvitation)
    private repository: Repository<weddingInvitation>,
  ) {}

  async add(args: IAdd) {
    return this.repository.save(args);
  }
}
