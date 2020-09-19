import React, { useMemo } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { queryCache, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import tw, { css } from 'twin.macro';
import tailwind from '../../../tailwind.config.js';

import { getJourneyWinner } from '../../core/apis/iotwApi';
import Carousel from '../Carousel';
import ErrorComponent from '../ErrorComponent';

const JourneyWinner: React.FC<{ queryKey: string; journeyId: string }> = (props) => {
    const { queryKey, journeyId } = props;
    const { t } = useTranslation();
    const handleError = useErrorHandler();

    const { data, isLoading } = useQuery(
        [queryKey, { journeyId }],
        (_: string, { journeyId: jid }) => {
            return getJourneyWinner(jid).toPromise();
        },
        {
            onError: (err: Error) => {
                handleError(err);
            },
        }
    );

    if (isLoading || !data) {
        return (
            <ContentLoader
                foregroundColor={tailwind.theme.colors.orange['100']}
                backgroundColor={tailwind.theme.colors.orange['200']}
                speed={2}
                width="50%"
                height="49vh"
                viewBox="0 0 400 250"
                {...props}>
                <rect x="6" y="61" rx="0" ry="0" width="379" height="172" />
                <rect x="6" y="10" rx="0" ry="0" width="186" height="27" />
            </ContentLoader>
        );
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

const JourneyWinnerWithErrorHandling: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const queryKey = useMemo(() => `${props.journeyId}-winner`, [journeyId]);
    return (
        <ErrorBoundary FallbackComponent={ErrorComponent} onReset={() => queryCache.refetchQueries(queryKey)}>
            <JourneyWinner {...{ journeyId, queryKey }} />
        </ErrorBoundary>
    );
};

export default JourneyWinnerWithErrorHandling;
