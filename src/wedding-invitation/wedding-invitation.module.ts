import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { weddingInvitation } from './entity';
import { WeddingInvitationRepository } from './repository';
import { WeddingInvitationResolver } from './wedding-invitation.resolver';
import { WeddingInvitationService } from './wedding-invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([weddingInvitation])],
  providers: [
    WeddingInvitationResolver,
    WeddingInvitationService,
    WeddingInvitationRepository,
  ],
})
export class WeddingInvitationModule {}
