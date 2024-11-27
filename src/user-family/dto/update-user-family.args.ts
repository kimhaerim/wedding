import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

@ArgsType()
export class UpdateUserFamilyArgs {
  @Min(1)
  @IsInt()
  @Field(() => Int)
  id: number;

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
