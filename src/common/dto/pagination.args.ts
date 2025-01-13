import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @IsInt()
  @Field(() => Int)
  offset: number;

  @IsInt()
  @Field(() => Int)
  limit: number;
}
