import I18n from 'react-native-i18n';
import en from './locales/en';
import spanish from './locales/spanish';

I18n.fallbacks = true;

I18n.translations = {
  en,
  spanish,
};
// I18n.locale = 'spanish';

export default I18n;
