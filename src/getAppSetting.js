import settingsJson from './settings.json';

export function getAppSetting(key) {
  // If in production get the setting from the window object
  if (window.SERVER_DATA && window?.SERVER_DATA[key]) {
    return window.SERVER_DATA[key];
  }
  // get the setting from the local settingJSON file
  console.log('SETTING', { [key]: settingsJson[key] });
  return settingsJson[key];
}
