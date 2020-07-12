import React from 'react';

import tw, { css, styled } from 'twin.macro';
import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings2';

import Home from '../../static/icons/home.svg';
import tailwind from '../../tailwind.config.js';

const NavbarStyle = tw.nav`
    fixed
    top-0
    left-0
    flex
    flex-row
    flex-no-wrap
    justify-between
    items-center
    p-4
    w-screen
    text-orange-200
    font-subtitle
`;

const HomeIcon = styled(Home)`
    ${tw`mr-4 cursor-pointer`}
`;

const Settings = styled(UseAnimations)`
    ${tw`cursor-pointer`}
`;

const Navbar = () => {
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
                    Images of the World
                </h1>
            </div>
            <Settings animation={settings} strokeColor={tailwind.theme.colors.orange['200']} />
        </NavbarStyle>
    );
};

export default Navbar;
