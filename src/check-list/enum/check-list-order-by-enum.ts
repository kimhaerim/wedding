import { registerEnumType } from '@nestjs/graphql';

export enum CheckListOrderBy {
  CREATED_AT = 'createdAt',
  COMPLETED_AT = 'completedAt',
}

registerEnumType(CheckListOrderBy, { name: 'CheckListOrderBy' });
