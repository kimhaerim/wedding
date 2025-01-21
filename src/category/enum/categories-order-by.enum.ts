import { registerEnumType } from '@nestjs/graphql';

export enum CategoriesOrderBy {
  CREATED_AT = 'createdAt',
}
registerEnumType(CategoriesOrderBy, { name: 'CategoriesOrderBy' });
