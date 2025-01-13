import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class CheckListsArgs {
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  categoryId?: number;
}
