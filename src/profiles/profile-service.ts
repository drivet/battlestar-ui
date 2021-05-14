import axios from 'axios';

import { getConfig } from '../config';
import { Profile, ProfileCreatePayload, Username } from './profile-models';

const config = getConfig();

export async function getProfile(id: string): Promise<Profile | null> {
  try {
    const res = await axios.get(`${config.apiBase}/profiles/${id}`);
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      return null;
    } else {
      throw err;
    }
  }
}

export async function createProfile(id: string, payload: ProfileCreatePayload): Promise<Profile> {
  const res = await axios.put(`${config.apiBase}/profiles/${id}`, payload);
  return res.data;
}

export async function getUsernames(authToken: string, search: string): Promise<Username[]> {
  const res = await axios.get(`${config.apiBase}/profiles/usernames?search=${search}`);
  return res.data;
}
