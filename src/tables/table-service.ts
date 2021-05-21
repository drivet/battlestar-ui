import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { fromEventSourceUrl } from '../common/utils';
import { getConfig } from '../config';
import {
  InviteCreatePayload,
  InviteUpdatePayload,
  Table,
  TableCreatePayload,
} from './table-models';

const config = getConfig();

export async function getTables(): Promise<Table[]> {
  const res = await axios.get(`${config.apiBase}/tables`);
  return res.data;
}

export function getTables$(token?: string): Observable<Table[]> {
  const url = token
    ? `${config.apiBase}/tables/stream?authorization=${token}`
    : `${config.apiBase}/tables/stream`;
  return fromEventSourceUrl(url).pipe(map((e: MessageEvent) => JSON.parse(e.data)));
}

export async function createTable(payload: TableCreatePayload): Promise<Table> {
  if (payload.bots > payload.seats - 1) {
    throw new Error(`Too many bots: ${payload.bots}`);
  }
  return axios.post(`${config.apiBase}/tables`, payload);
}

export async function deleteTable(id: string): Promise<AxiosResponse> {
  return axios.delete(`${config.apiBase}/tables/${id}`);
}

export async function createInvite(
  id: string,
  recipient: string,
  payload: InviteCreatePayload
): Promise<AxiosResponse> {
  return axios.put(`${config.apiBase}/tables/${id}/invitations/${recipient}`, payload);
}

export async function updateInvite(
  id: string,
  recipient: string,
  payload: InviteUpdatePayload
): Promise<AxiosResponse> {
  return axios.patch(`${config.apiBase}/tables/${id}/invitations/${recipient}`, payload);
}

export async function deleteInvite(id: string, recipient: string): Promise<AxiosResponse> {
  return axios.delete(`${config.apiBase}/tables/${id}/invitations/${recipient}`);
}
