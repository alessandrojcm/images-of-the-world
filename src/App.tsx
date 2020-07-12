import React from 'react';
import tw, { css } from 'twin.macro';

import { useTranslation } from 'react-i18next';

import MainLayout from './components/Layout';

const App: React.FC = () => {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <h1
                css={css`
                    ${tw`text-5xl font-display`}
                `}>
                {t('mainTitle')}
            </h1>
        </MainLayout>
    );
};

export default App;
