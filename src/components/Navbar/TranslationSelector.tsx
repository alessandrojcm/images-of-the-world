import React, { Key, useCallback, useMemo } from 'react';

import tw, { styled } from 'twin.macro';
import settings from 'react-useanimations/lib/settings2';

import { Dropdown, Item } from '../dropdown';

import tailwind from '../../../tailwind.config.js';
import i18n from '../../core/i18n';

const Language = styled.p`
    ${(props: { language: string; selectedLanguage: string }) => (props.language === props.selectedLanguage ? tw`text-primary` : tw`cursor-pointer text-color-orange-200 hover:text-yellow`)}
    ${tw`font-body text-sm font-medium`}
`;

const TranslationSelector = () => {
    const currentLanguage = useMemo(() => i18n.language, [i18n.language]);
    const changeSelectedLanguage = useCallback(
        (key: Key) => {
            console.log(key);
            if (key === currentLanguage) {
                return;
            }
            i18n.changeLanguage(key as string);
        },
        [i18n, currentLanguage]
    );

    return (
        <Dropdown button={settings} strokeColor={tailwind.theme.colors.orange['200']} onSelect={changeSelectedLanguage} label="languages">
            <Item key="en" textValue="English">
                <Language selectedLanguage={currentLanguage} language="en">
                    English
                </Language>
            </Item>
            <Item key="es" textValue="Spanish">
                <Language selectedLanguage={currentLanguage} language="es">
                    Spanish
                </Language>
            </Item>
        </Dropdown>
    );
};

export default TranslationSelector;
