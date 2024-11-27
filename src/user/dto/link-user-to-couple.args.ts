import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';

@ArgsType()
export class LinkUserToCoupleArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  coupleId: number;
}
