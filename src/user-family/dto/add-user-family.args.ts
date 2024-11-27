import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { Relation } from '../enum';

@ArgsType()
export class AddUserFamilyArgs {
  @IsEnum(Relation)
  @Field(() => Relation)
  relation: Relation;

  @IsString()
  @Field(() => String)
  name: string;

  @IsBoolean()
  @Field(() => Boolean)
  isDecease: boolean;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  accountNumber?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  bank?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  accountHolder?: string;
}
