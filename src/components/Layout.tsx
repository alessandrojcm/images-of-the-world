import React from 'react';
import tw, { styled } from 'twin.macro';
import { useRouteMatch } from 'react-router-dom';

import Navbar from './Navbar';
import BackgroundImage from './BackgroundImage';

const BACKGROUND_IMAGE_ID = 'eOcyhe5-9sQ';

const MainLayout = styled.main`
    ${tw` flex
    flex-col
    flex-no-wrap
    items-center
    justify-center
    h-screen
    text-orange-200
    text-lg
    antialiased
    font-semibold
    tracking-wide
    relative`}
    ${(props: { match: boolean }) => (props.match ? '' : `bg-primary`)}
`;

// eslint-disable-next-line react/prop-types
const Layout: React.FC = ({ children }) => {
    const match = useRouteMatch(['']);

    return (
        <>
            {Boolean(match) && <BackgroundImage photoId={BACKGROUND_IMAGE_ID} width={1280} backgroundColor="bg-color-primary" />}
            <MainLayout match={Boolean(match)}>
                <Navbar />
                {children}
            </MainLayout>
        </>
    );
};

export default Layout;
