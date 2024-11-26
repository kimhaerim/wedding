import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsInt } from 'class-validator';

@ArgsType()
export class LinkChecklistsToCategoryArgs {
  @IsArray()
  @IsInt({ each: true })
  @Field(() => [Int])
  checkListIds: number[];

  @IsInt()
  @Field(() => Int)
  categoryId: number;
}
