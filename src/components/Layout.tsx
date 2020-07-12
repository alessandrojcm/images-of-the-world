import React from 'react';
import tw from 'twin.macro';
import Navbar from './Navbar';

const MainLayout = tw.main`
    flex
    flex-col
    flex-no-wrap
    items-center
    justify-center
    h-screen
    bg-black
    text-orange-200
    text-lg
    antialiased
    font-semibold
    tracking-wide
`;

const Layout: React.FC = ({ children }) => {
    return (
        <MainLayout>
            <Navbar />
            {children}
        </MainLayout>
    );
};

export default Layout;
