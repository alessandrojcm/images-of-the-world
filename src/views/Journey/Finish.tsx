import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import tw, { css } from 'twin.macro';

import { useCurrentUser } from '../../context/CurrentUserContext';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';
import Carousel from '../../components/Carousel';

import { Subtitle, Title } from '../../components/Typography';
import { ColumnContainer as Container } from '../../components/Container';
import { PrimaryButton as Button } from '../../components/Button';

const Finish: React.FC = () => {
    const { t } = useTranslation();
    const { userLoggedIn } = useCurrentUser();
    const { winner } = useJourneyState();
    const { reset } = useJourneyDispatchers();
    const { push } = useHistory();

    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    if (!winner) {
        return <Redirect to="/journey/start" />;
    }

    return (
        <Container
            css={css`
                ${tw`items-center`}
            `}>
            <Title>{t('finishTitle')}</Title>
            <Subtitle
                css={css`
                    ${tw`pb-4`}
                `}>
                {t('journeyWinner', {
                    sellerName: winner.sellerName,
                    points: winner.points,
                })}
            </Subtitle>
            <Carousel imageIds={winner.collectedImages} />
            <Button
                onClick={() => {
                    reset();
                    push('/');
                }}>
                {t('returnToHome')}
            </Button>
        </Container>
    );
};

export default Finish;
