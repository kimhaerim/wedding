export interface IAddWeddingInvitation {
  invitationTitle: string;
  invitationDescription: string;
  address: string;
  detailedAddress: string;
  attendTitle?: string;
  attendDescription?: string;
  chatTitle?: string;
  chatDescription?: string;
  coupleId: number;
}
