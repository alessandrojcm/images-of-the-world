import React from 'react';
import tw, { css } from 'twin.macro';

import MainLayout from './components/Layout';

const App: React.FC = () => {
    return (
        <MainLayout>
            <h1
                css={css`
                    ${tw`text-5xl font-display`}
                `}>
                Hello!
            </h1>
        </MainLayout>
    );
};

export default App;
