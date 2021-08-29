import settingsJson from './settings.json';

export function getAppSetting(key) {
  // If in production get the setting from the window object
  if (window._env_ && window?._env_[key]) {
    return window._env_[key];
  }
  // get the setting from the local settingJSON filew
  return settingsJson[key];
}
