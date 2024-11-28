import { Injectable } from '@nestjs/common';

import { IAddWeddingInvitation } from './interface';
import { WeddingInvitationRepository } from './repository';

@Injectable()
export class WeddingInvitationService {
  constructor(
    private readonly weddingInvitationRepository: WeddingInvitationRepository,
  ) {}

  async addWeddingInvitation(args: IAddWeddingInvitation) {
    const { attendTitle, attendDescription } = args;
    const { chatTitle, chatDescription } = args;
    const {
      invitationTitle: title,
      invitationDescription: description,
      address,
      detailedAddress,
      coupleId,
    } = args;
    await this.weddingInvitationRepository.add({
      coupleId,
      title,
      description,
      address,
      detailedAddress,
    });

    if (attendTitle && attendDescription) {
      // 참석여부 저장
    }

    if (chatTitle && chatDescription) {
      // 채팅 저장
    }

    return true;
  }
}
