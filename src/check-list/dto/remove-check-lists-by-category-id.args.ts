import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class RemoveCheckListsByCategoryIdArgs {
  @IsInt()
  @Field(() => Int)
  categoryId: number;
}
