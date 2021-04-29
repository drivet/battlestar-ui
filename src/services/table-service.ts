import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { Table, TableCreatePayload } from './table-models';

const config = getConfig();

export async function getCurrentTables(authToken: string, user: string): Promise<Table[]> {
  const res1 = await fetchRecieved(authToken, user);
  const res2 = await fetchSent(authToken, user);
  return res1.data.filter(isAccepted).concat(res2.data.filter(isAccepted));
}

export async function getSentInvites(authToken: string, inviter: string): Promise<Table[]> {
  const res = await fetchSent(authToken, inviter);
  return res.data.filter((t) => !isAccepted(t));
}

export async function getRecievedInvites(authToken: string, invitee: string): Promise<Table[]> {
  const res = await fetchRecieved(authToken, invitee);
  return res.data.filter((t) => !isAccepted(t));
}

export async function createTable(
  authToken: string,
  inviter: string,
  seats: number,
  bots: number
): Promise<Table> {
  if (bots > seats - 1) {
    throw new Error('Invites not supported yet');
  }
  return sendCreate(authToken, { seats, inviter, bots });
}

function fetchRecieved(authToken: string, invitee: string): Promise<AxiosResponse<Table[]>> {
  return axios.get(`${config.apiBase}/tables?invitee=${invitee}`, reqConfig(authToken));
}

function fetchSent(authToken: string, inviter: string): Promise<AxiosResponse<Table[]>> {
  return axios.get(`${config.apiBase}/tables?inviter=${inviter}`, reqConfig(authToken));
}

function sendCreate(authToken: string, tableCreatePayload: TableCreatePayload): Promise<Table> {
  return axios.post(`${config.apiBase}/tables`, tableCreatePayload, reqConfig(authToken));
}

function isAccepted(table: Table): boolean {
  const acceptedInvites = table.invitations
    ? table.invitations.filter((invite) => invite.status === 'accepted').length
    : 0;
  return 1 + acceptedInvites + table.bots === table.seats;
}

function reqConfig(authToken: string | undefined): AxiosRequestConfig {
  if (!authToken) {
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
}
