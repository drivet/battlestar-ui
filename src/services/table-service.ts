import { Config, getConfig } from './../config';
import { Table } from './table-models';

export class TableService {
  private config: Config;

  constructor() {
    this.config = getConfig();
  }

  async getSentInvites(): Promise<Table[]> {
    // const res = await axios.get(`${this.config.apiBase}/tables?inviter=desmond`);
    return [];
  }

  async getRecievedInvites(): Promise<Table[]> {
    // const res = await axios.get(`${this.config.apiBase}/tables?invitee=desmond`);
    return [];
  }
}
