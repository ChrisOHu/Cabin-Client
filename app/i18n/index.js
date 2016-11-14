import { Platform } from 'react-native'
import counterpart from 'counterpart'
import En from './en'
import Zh from './zh'

export function init() {
  /**
   * see http://www.science.co.il/language/locale-codes.asp
   * for locale codes
   */

  let locale;
  switch (Platform.OS) {
    case 'ios':
      locale = require('react-native')
        .NativeModules.SettingsManager.settings.AppleLocale;
      break;
    case 'android':
      throw new Error(`#TODO: locale support for android`);
      break;
    default:
      throw new Error(`unsupported platform: ${Platform.OS}`);
  }

  // 'zh-cn', 'en-US' => 'zh', 'en'
  locale = (/^[a-z]*/.exec(locale.trim().toLowerCase()))[0]
  setLocale(locale, true)
}

export function setLocale(locale, init) {

  if (!init && locale == counterpart.getLocale()) return

  let translates
  switch (locale) {
    case 'zh':
      translations = Zh
      break
    case 'en':
    default:
      translations = En
      break
  }

  // First reset current locale's translations
  counterpart.registerTranslations(counterpart.getLocale(), null)
  // Then register new locale's translations
  counterpart.registerTranslations(locale, translations)
  counterpart.setLocale(locale)
}

