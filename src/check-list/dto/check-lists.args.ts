import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class CheckListsArgs {
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isCompleted?: boolean;
}
