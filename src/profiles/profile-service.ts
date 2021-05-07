import axios, { AxiosRequestConfig } from 'axios';

import { getConfig } from '../config';
import { Profile, ProfileUpdatePayload } from './profile-models';

const config = getConfig();

export async function getProfile(authToken: string, id: string): Promise<Profile | null> {
  try {
    const res = await axios.get(`${config.apiBase}/profiles/${id}`, reqConfig(authToken));
    return res.data;
  } catch (err) {
    if (err.response.status === 404) {
      return null;
    } else {
      throw err;
    }
  }
}

export async function getProfileByNickname(
  authToken: string,
  nickname: string
): Promise<Profile | null> {
  const res = await axios.get(
    `${config.apiBase}/profiles?nickname=${nickname}`,
    reqConfig(authToken)
  );
  const profiles = res.data;
  if (profiles.length === 0) {
    return null;
  }
  return profiles[0];
}

export async function updateProfile(
  authToken: string,
  body: ProfileUpdatePayload,
  id: string
): Promise<Profile> {
  const res = await axios.patch(`${config.apiBase}/profiles/${id}`, body, reqConfig(authToken));
  return res.data;
}

export async function createProfile(
  authToken: string,
  id: string,
  nickname: string
): Promise<Profile> {
  const res = await axios.put(
    `${config.apiBase}/profiles/${id}`,
    { nickname },
    reqConfig(authToken)
  );
  return res.data;
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
