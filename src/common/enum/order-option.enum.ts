import { registerEnumType } from '@nestjs/graphql';

export enum OrderOption {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderOption, { name: 'OrderOption' });
