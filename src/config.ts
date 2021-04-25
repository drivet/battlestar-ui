const envVars = ['REACT_APP_BSG_API_BASE'] as const;
type EnvVarsType = typeof envVars[number];

function getEnv(key: EnvVarsType) {
  const val = process.env[key];
  if (val === null || val === undefined) {
    throw new Error(`missing config for ${key}`);
  }
  return val;
}

export interface Config {
  apiBase: string;
}

export function getConfig(): Config {
  return {
    apiBase: getEnv('REACT_APP_BSG_API_BASE'),
  };
}
