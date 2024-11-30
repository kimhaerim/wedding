import { registerEnumType } from '@nestjs/graphql';

export enum CostType {
  BASE = 'base',
  ADDITIONAL = 'additional',
}
registerEnumType(CostType, { name: 'CostType' });
