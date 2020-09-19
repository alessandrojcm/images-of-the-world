import React, { useMemo } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import { queryCache, useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { pluck } from 'rxjs/operators';
import tw, { css } from 'twin.macro';
import ContentLoader from 'react-content-loader';
import tailwind from '../../../tailwind.config.js';

import { getJourneyState } from '../../core/apis/iotwApi';
import ErrorComponent from '../ErrorComponent';

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
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width="100%"
                    height="2rem"
                    viewBox="0 0 200 30"
                    foregroundOpacity={0.75}
                    foregroundColor={tailwind.theme.colors.black}
                    backgroundColor={tailwind.theme.colors.black}
                    {...props}>
                    <rect x="0" y="0" rx="0" ry="0" width="90%" height="30" />
                </ContentLoader>
            ) : (
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
            )}
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
                <UserCard {...{ queryKey, journeyId }} />
            </section>
        </ErrorBoundary>
    );
};

export default UserCardWithErrorBoundary;
