import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator';

import { Gender } from '../enum';

@ArgsType()
export class UpdateUserProfileArgs {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  birthday?: string;

  @IsOptional()
  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  weddingDate?: Date;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  coupleStartDate?: string;
}
