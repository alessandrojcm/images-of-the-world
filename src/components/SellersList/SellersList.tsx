import React, { useMemo } from 'react';
import { queryCache, useQuery } from 'react-query';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import tw, { css } from 'twin.macro';

import { getJourneysSellers } from '../../core/apis/iotwApi';
import ErrorComponent from '../ErrorComponent';

const SellersList: React.FC<{ journeyId: string; queryKey: string }> = (props) => {
    const { journeyId, queryKey } = props;
    const { t } = useTranslation();
    const handleError = useErrorHandler();

    const { data, isLoading } = useQuery(
        [queryKey, { journeyId }],
        (_: string, { journeyId: jid }) => {
            return getJourneysSellers(jid).toPromise();
        },
        {
            onError: (err: Error) => handleError(err),
        }
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1
                css={css`
                    ${tw`text-center font-display text-xl pb-2`}
                `}>
                {t('journeySellers')}
            </h1>
            {data?.map((seller) => {
                return (
                    <summary
                        css={css`
                            ${tw`
                                font-body
                                text-lg
                                list-none
                             `}
                        `}
                        key={seller.id}>
                        <p>
                            {t('journeySeller', {
                                sellerName: seller.sellerName,
                                p: seller.points,
                            })}
                        </p>
                    </summary>
                );
            })}
        </>
    );
};

const SellersListWithErrorBoundary: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const queryKey = useMemo(() => `${props.journeyId}-sellers`, [journeyId]);

    return (
        <ErrorBoundary onReset={() => queryCache.refetchQueries(queryKey)} FallbackComponent={ErrorComponent}>
            <section
                css={css`
                    ${tw`
                    bg-orange-100
                    bg-opacity-75
                    text-black
                    w-full
                    p-4
                    rounded
                    text-shadow
                `}
                `}>
                <SellersList journeyId={journeyId} queryKey={queryKey} />
            </section>
        </ErrorBoundary>
    );
};

export default SellersListWithErrorBoundary;
