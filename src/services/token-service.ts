import axios, { AxiosResponse } from 'axios';

import { getConfig } from '../config';

const config = getConfig();

export async function validateIdToken(idToken: string): Promise<AxiosResponse> {
  return await axios.post(`${config.apiBase}/tokens/sessions`, `idtoken=${idToken}`);
}
