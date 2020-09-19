import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LeaderBoardButton, StartButton } from './StyledComponents';
import { Subtitle, Title } from '../../components/Typography';
import { ButtonsContainer } from '../../components/Form';
import Container from '../../components/Container';

const Home = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Title>{t('mainTitle')}</Title>
            <Subtitle>{t('mainSubtitle')}</Subtitle>
            <ButtonsContainer>
                <LeaderBoardButton>
                    <Link to="leaderboard">{t('leaderboardButton')}</Link>
                </LeaderBoardButton>
                <StartButton>
                    <Link to="journey">{t('start')}</Link>
                </StartButton>
            </ButtonsContainer>
        </Container>
    );
};

// eslint-disable-next-line import/prefer-default-export
export { Home };
