import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import tw, { css } from 'twin.macro';

import { getJourneyWinner } from '../../core/apis/iotwApi';
import Carousel from '../Carousel';

// TODO: error boundary
const JourneyWinner: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const { t } = useTranslation();

    const { data, isLoading } = useQuery([`${journeyId}-winner`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneyWinner(jid).toPromise();
    });

    if (isLoading || !data) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <h1
                css={css`
                    ${tw`font-display text-2xl text-shadow`}
                `}>
                {t('winnerSeller', { sellerName: data?.sellerName })}
            </h1>
            <Carousel imageIds={data.collectedImages} />
        </div>
    );
};

export default JourneyWinner;
