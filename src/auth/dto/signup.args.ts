import { ArgsType, Field, Int } from '@nestjs/graphql';

import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '../../user/enum';

@ArgsType()
export class SignupArgs {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  birthDay?: string;

  @Field(() => Gender)
  gender: Gender;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  coupleId?: number;

  @IsOptional()
  @IsDate()
  @Field(() => Date, { nullable: true })
  weddingDate?: Date;

  @IsOptional()
  @IsDateString()
  @Field({ nullable: true })
  coupleStartDate?: string;
}
