import { Couple } from '../entity';

export type IAddCouple = Pick<Couple, 'weddingDate' | 'coupleStartDate'>;
