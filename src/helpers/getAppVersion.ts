export const isDevMode = import.meta.env.ENV === 'development' ? true : false;

export function getAppVersion(commitHash: string, isDevMode: boolean) {
  const appVersion = `ClimateMindApp-${isDevMode ? 'dev-' : ''}${commitHash}`;
  return appVersion;
}
