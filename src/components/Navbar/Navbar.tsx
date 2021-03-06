import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoHome } from 'react-icons/go';
import tw, { css, styled } from 'twin.macro';

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

const HomeIcon = styled(GoHome)`
    ${tw`mr-4 cursor-pointer self-center`}
`;

const Navbar = () => {
    const { t } = useTranslation();

    return (
        <NavbarStyle>
            <Link
                to="/"
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
            </Link>
            <TranslationSelector />
        </NavbarStyle>
    );
};

export default Navbar;
