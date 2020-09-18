import React from 'react';
import { useQuery } from 'react-query';

import { getJourneysSellers } from '../../core/apis/iotwApi';

// TODO: Error boundary
const SellersList: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;

    const { data, isLoading } = useQuery([`${journeyId}-sellers`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneysSellers(jid).toPromise();
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    // TODO: i18n
    return (
        <div>
            <h1>Journey sellers</h1>
            {data?.map((seller) => {
                return (
                    <summary key={seller.id}>
                        <h1>{seller.sellerName}</h1>
                        <p>{seller.points}</p>
                    </summary>
                );
            })}
        </div>
    );
};

export default SellersList;
