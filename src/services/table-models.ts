export type InviteStatus = 'created' | 'accepted' | 'rejected';

export interface Invite {
  invitee: string;
  createdAt: Date;
  status: InviteStatus;
}

export interface Table {
  _id: string;

  createdAt: string;

  inviter: string;

  // 3-6
  seats: number;

  // 0 - (size -1)
  bots: number;

  invitations?: Invite[];
}

export interface TableCreatePayload {
  inviter: string;
  seats: number;
  bots: number;
}
