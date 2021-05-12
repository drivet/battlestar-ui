export type InviteStatus = 'created' | 'accepted' | 'rejected';

export interface TableCreatePayload {
  owner: string;
  ownerUsername: string;
  seats: number;
  bots: number;
}

export interface InviteUpdatePayload {
  status: InviteStatus;
}

export interface InviteCreatePayload {
  recipientUsername: string;
}

export interface Invite {
  recipient: string;
  recipientUsername: string;
  createdAt: string;
  status: InviteStatus;
}

export interface Table {
  _id: string;
  createdAt: string;
  owner: string;
  ownerUsername: string;
  seats: number;
  bots: number;
  invitations?: Invite[];
}
