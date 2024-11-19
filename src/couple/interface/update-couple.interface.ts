import { Couple } from '../entity';

export type IUpdateCouple = Pick<
  Couple,
  'id' | 'weddingDate' | 'coupleStartDate'
>;
