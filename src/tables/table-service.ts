import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { Table } from './table-models';

const config = getConfig();

export async function getTables(authToken: string): Promise<Table[]> {
  const res = await axios.get(`${config.apiBase}/tables`, reqConfig(authToken));
  return res.data;
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
  return axios.post(`${config.apiBase}/tables`, { seats, inviter, bots }, reqConfig(authToken));
}

export async function deleteTable(authToken: string, id: string): Promise<AxiosResponse> {
  return axios.delete(`${config.apiBase}/tables/${id}`, reqConfig(authToken));
}

export async function createInvite(
  authToken: string,
  id: string,
  invited: string
): Promise<AxiosResponse> {
  return axios.put(
    `${config.apiBase}/tables/${id}/invitations/${invited}`,
    {},
    reqConfig(authToken)
  );
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
