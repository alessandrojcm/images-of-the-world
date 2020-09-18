import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { pluck } from 'rxjs/operators';
import tw, { css } from 'twin.macro';

import { getJourneyState } from '../../core/apis/iotwApi';

// TODO: Error boundary
const UserCard: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const { t } = useTranslation();

    const { data, isLoading } = useQuery([`${journeyId}-user`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneyState(jid).pipe(pluck('user')).toPromise();
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
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
                <p>
                    <strong
                        css={css`
                            ${tw`font-bold`}
                        `}>
                        {t('name')}:{' '}
                    </strong>
                    {data?.name}
                </p>
                <p>
                    <strong
                        css={css`
                            ${tw`font-bold`}
                        `}>
                        {t('lastName')}:{' '}
                    </strong>
                    {data?.lastName}
                </p>
            </summary>
        </section>
    );
};

export default UserCard;
