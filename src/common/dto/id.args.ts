import { Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

export class IdArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  id: number;
}
