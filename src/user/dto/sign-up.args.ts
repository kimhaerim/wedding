import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Gender } from '../enum';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

@ArgsType()
export class SingUpArgs {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  coupleId?: number;

  @IsString()
  @Field(() => String)
  password: string;

  @IsString()
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsDateString()
  @Field(() => Date, { nullable: true })
  birthDay?: Date;

  @Field(() => Gender)
  gender: Gender;
}
