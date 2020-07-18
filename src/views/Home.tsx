import React from 'react';
import tw, { css } from 'twin.macro';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    return (
        <h1
            css={css`
                ${tw`text-5xl font-display`}
            `}>
            {t('mainTitle')}
        </h1>
    );
};

export default Home;
