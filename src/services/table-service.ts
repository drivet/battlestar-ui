import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { getConfig } from '../config';
import { Table, TableCreatePayload } from './table-models';

const config = getConfig();

export async function getTables(authToken: string): Promise<Table[]> {
  const res = await fetchTables(authToken);
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
  return sendCreate(authToken, { seats, inviter, bots });
}

export async function deleteTable(authToken: string, id: string): Promise<AxiosResponse> {
  return axios.delete(`${config.apiBase}/tables/${id}`, reqConfig(authToken));
}

function fetchTables(authToken: string): Promise<AxiosResponse<Table[]>> {
  return axios.get(`${config.apiBase}/tables`, reqConfig(authToken));
}

function sendCreate(authToken: string, tableCreatePayload: TableCreatePayload): Promise<Table> {
  return axios.post(`${config.apiBase}/tables`, tableCreatePayload, reqConfig(authToken));
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
