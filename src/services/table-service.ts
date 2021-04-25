import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { Table } from './table-models';

const config = getConfig();

export async function getCurrentTables(authToken: string, user: string): Promise<Table[]> {
  const res1 = await fetchRecieved(authToken, user);
  const res2 = await fetchSent(authToken, user);
  return res1.data.filter(isAccepted).concat(res2.data.filter(isAccepted));
}

export async function getSentInvites(authToken: string, inviter: string): Promise<Table[]> {
  const res = await fetchSent(authToken, inviter);
  return res.data.filter(isPending);
}

export async function getRecievedInvites(authToken: string, invitee: string): Promise<Table[]> {
  const res = await fetchRecieved(authToken, invitee);
  return res.data.filter(isPending);
}

function fetchRecieved(authToken: string, invitee: string): Promise<AxiosResponse<Table[]>> {
  return axios.get(`${config.apiBase}/tables?invitee=${invitee}`, reqConfig(authToken));
}

function fetchSent(authToken: string, inviter: string): Promise<AxiosResponse<Table[]>> {
  return axios.get(`${config.apiBase}/tables?inviter=${inviter}`, reqConfig(authToken));
}

function isAccepted(table: Table): boolean {
  return !!table.invitations && table.invitations.every((invite) => invite.status === 'accepted');
}

function isPending(table: Table): boolean {
  return !!table.invitations && table.invitations.some((invite) => invite.status !== 'accepted');
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
