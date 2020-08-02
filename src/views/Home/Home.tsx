import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ButtonsContainer, Container, LeaderBoardButton, StartButton, Subtitle, Title } from './StyledComponents';

const Home = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Title>{t('mainTitle')}</Title>
            <Subtitle>{t('mainSubtitle')}</Subtitle>
            <ButtonsContainer>
                <LeaderBoardButton onClick={() => {}}>
                    <Link to="leaderboard">{t('leaderboard')}</Link>
                </LeaderBoardButton>
                <StartButton onClick={() => {}}>
                    <Link to="start">{t('start')}</Link>
                </StartButton>
            </ButtonsContainer>
        </Container>
    );
};

// eslint-disable-next-line import/prefer-default-export
export { Home };
