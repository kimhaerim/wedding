import { registerEnumType } from '@nestjs/graphql';

export enum Relation {
  FATHER = 'father',
  MOTHER = 'mother',
  GRANDMOTHER = 'grandmother',
  GRANDFATHER = 'grandfather',
}
registerEnumType(Relation, { name: 'Relation' });
