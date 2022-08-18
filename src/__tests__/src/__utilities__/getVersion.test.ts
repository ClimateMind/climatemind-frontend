import { getAppVersion } from '../../../helpers/getAppVersion';

const GIT_COMMIT_HASH = '123';

describe('App Version', () => {
  it('It show the correct version in dev mode', () => {
    const appVersion = getAppVersion(GIT_COMMIT_HASH, true);
    expect(appVersion).toBe(`ClimateMindApp-dev-${GIT_COMMIT_HASH}`);
  });
  it('It show the correct version in production', () => {
    const appVersion = getAppVersion(GIT_COMMIT_HASH, false);
    expect(appVersion).toBe(`ClimateMindApp-${GIT_COMMIT_HASH}`);
  });
});
