import React from 'react';

import tw, { css, styled } from 'twin.macro';

import { useTranslation } from 'react-i18next';
import Home from '../../../static/icons/home.svg';
import TranslationSelector from './TranslationSelector';

const NavbarStyle = tw.nav`
    fixed
    top-0
    left-0
    flex
    flex-row
    flex-no-wrap
    justify-between
    items-center
    px-4
    pt-2
    w-screen
    text-orange-200
    font-subtitle
`;

const HomeIcon = styled(Home)`
    ${tw`mr-4 cursor-pointer`}
`;

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <NavbarStyle>
            <div
                css={css`
                    ${tw`flex`}
                `}>
                <HomeIcon />
                <h1
                    css={css`
                        ${tw`cursor-pointer italic`}
                    `}>
                    {t('siteTitle')}
                </h1>
            </div>
            <TranslationSelector />
        </NavbarStyle>
    );
};

export default Navbar;
