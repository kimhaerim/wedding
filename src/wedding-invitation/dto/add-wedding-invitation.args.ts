import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class AddWeddingInvitationArgs {
  @IsString()
  @Field(() => String)
  invitationTitle: string;

  @IsString()
  @Field(() => String)
  invitationDescription: string;

  @IsString()
  @Field(() => String)
  address: string;

  @IsString()
  @Field(() => String)
  detailedAddress: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  attendTitle?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  attendDescription?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  chatTitle?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  chatDescription?: string;
}
