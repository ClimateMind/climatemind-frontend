export const isDevMode = process.env.NODE_ENV === 'development' ? true : false;

export function getAppVersion(commitHash: string, isDevMode: boolean) {
  const appVersion = `ClimateMindApp-${isDevMode ? 'dev-' : ''}${commitHash}`;
  return appVersion;
}
