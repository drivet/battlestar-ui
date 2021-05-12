import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { InviteCreatePayload, Table, TableCreatePayload } from './table-models';

const config = getConfig();

export async function getTables(authToken: string): Promise<Table[]> {
  const res = await axios.get(`${config.apiBase}/tables`, reqConfig(authToken));
  return res.data;
}

export async function createTable(authToken: string, payload: TableCreatePayload): Promise<Table> {
  if (payload.bots > payload.seats - 1) {
    throw new Error(`Too many bots: ${payload.bots}`);
  }
  return axios.post(`${config.apiBase}/tables`, payload, reqConfig(authToken));
}

export async function deleteTable(authToken: string, id: string): Promise<AxiosResponse> {
  return axios.delete(`${config.apiBase}/tables/${id}`, reqConfig(authToken));
}

export async function createInvite(
  authToken: string,
  id: string,
  recipient: string,
  payload: InviteCreatePayload
): Promise<AxiosResponse> {
  return axios.put(
    `${config.apiBase}/tables/${id}/invitations/${recipient}`,
    payload,
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
