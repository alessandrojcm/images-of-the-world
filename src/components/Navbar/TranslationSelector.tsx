import React, { useCallback, useMemo } from 'react';

import { Menu, MenuButton, MenuList, MenuItem } from '@reach/menu-button';
import tw, { styled } from 'twin.macro';
import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings2';

import i18n from '../../core/i18n';
import tailwind from '../../../tailwind.config.js';

const Settings = styled(UseAnimations)`
    ${tw`cursor-pointer`}
`;

const Language = styled.p`
    ${(props: { language: string; selectedLanguage: string }) => (props.language === props.selectedLanguage ? tw`text-primary` : tw`cursor-pointer text-color-orange-200 hover:text-yellow`)}
    ${tw`font-body text-sm font-medium`}
`;

const StyledMenu = styled(MenuList)`
    ${tw`py-4 border-0 transition-opacity animation-slide-down animation-2s animation-ease`}
`;

const TranslationSelector = () => {
    const currentLanguage = useMemo(() => i18n.language, [i18n.language]);
    const changeSelectedLanguage = useCallback(
        (key: string) => {
            if (key === currentLanguage) {
                return;
            }
            i18n.changeLanguage(key);
        },
        [i18n, currentLanguage]
    );

    return (
        <Menu>
            <MenuButton>
                <Settings animation={settings} strokeColor={tailwind.theme.colors.orange['200']} />
            </MenuButton>
            <StyledMenu>
                <MenuItem onSelect={() => changeSelectedLanguage('en')}>
                    <Language selectedLanguage={currentLanguage} language="en">
                        English
                    </Language>
                </MenuItem>
                <MenuItem onSelect={() => changeSelectedLanguage('es')}>
                    <Language selectedLanguage={currentLanguage} language="es">
                        Spanish
                    </Language>
                </MenuItem>
            </StyledMenu>
        </Menu>
    );
};

export default TranslationSelector;
