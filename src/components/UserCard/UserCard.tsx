import React, { useMemo } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { queryCache, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { pluck } from 'rxjs/operators';
import tw, { css } from 'twin.macro';

import { getJourneyState } from '../../core/apis/iotwApi';
import ErrorComponent from '../ErrorComponent';

// TODO: Error boundary
const UserCard: React.FC<{ journeyId: string; queryKey: string }> = (props) => {
    const { journeyId, queryKey } = props;
    const { t } = useTranslation();
    const handleError = useErrorHandler();

    const { data, isLoading } = useQuery(
        [queryKey, { journeyId }],
        (_: string, { journeyId: jid }) => {
            return getJourneyState(jid).pipe(pluck('user')).toPromise();
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
            <header
                css={css`
                    ${tw`
                    font-display
                    pb-2
                    text-center
                    `}
                `}>
                <h1
                    css={css`
                        ${tw`text-xl text-shadow`}
                    `}>
                    {t('journeyUser')}
                </h1>
            </header>
            <summary
                css={css`
                    ${tw`
                    list-none
                    flex
                    flex-col
                    items-start
                    justify-around
                    font-body
                    text-xl
                    text-shadow
                    `}
                `}>
                <p>{`${data?.name} ${data?.lastName}`}</p>
            </summary>
        </>
    );
};

const UserCardWithErrorBoundary: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const queryKey = useMemo(() => `${props.journeyId}-user`, [journeyId]);

    return (
        <ErrorBoundary onReset={() => queryCache.refetchQueries(queryKey)} FallbackComponent={ErrorComponent}>
            <section
                css={css`
                    ${tw`
                text-left
                bg-orange-100
                bg-opacity-75
                rounded
                text-black
                p-4
                `}
                `}>
                <UserCard journeyId={journeyId} queryKey={queryKey} />
            </section>
        </ErrorBoundary>
    );
};

export default UserCardWithErrorBoundary;
