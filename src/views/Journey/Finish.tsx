import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import tw, { css } from 'twin.macro';

import { useCurrentUser } from '../../context/CurrentUserContext';
import { useJourneyDispatchers, useJourneyState } from '../../context/JourneyStateContext';

import { Subtitle, Title } from '../../components/Typography';
import { ColumnContainer as Container } from '../../components/Container';
import { PrimaryButton as Button } from '../../components/Button';

const Finish: React.FC = () => {
    const { t } = useTranslation();
    const { userLoggedIn } = useCurrentUser();
    const { winner } = useJourneyState();
    const { reset } = useJourneyDispatchers();
    const { push } = useHistory();

    // TODO: save winner and reset state
    if (!userLoggedIn) {
        return <Redirect to="/journey" />;
    }

    if (!winner) {
        return <Redirect to="/journey/start" />;
    }

    // TODO: add a gallery for the collected images.
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
