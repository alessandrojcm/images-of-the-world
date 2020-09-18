import React from 'react';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import tw, { css } from 'twin.macro';

import { getJourneysSellers } from '../../core/apis/iotwApi';

// TODO: Error boundary
const SellersList: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;
    const { t } = useTranslation();

    const { data, isLoading } = useQuery([`${journeyId}-sellers`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneysSellers(jid).toPromise();
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    // TODO: i18n
    return (
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
        </section>
    );
};

export default SellersList;
