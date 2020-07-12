import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

import { initReactI18next } from 'react-i18next';

i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
    });

export default i18n;
