import { registerEnumType } from '@nestjs/graphql';

export enum CheckListStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

registerEnumType(CheckListStatus, { name: 'CheckListStatus' });
