import React from 'react';
import { useQuery } from 'react-query';
import { getJourneyWinner } from '../../core/apis/iotwApi';
import Carousel from '../Carousel';

// TODO: error boundary
const JourneyWinner: React.FC<{ journeyId: string }> = (props) => {
    const { journeyId } = props;

    const { data, isLoading } = useQuery([`${journeyId}-winner`, { journeyId }], (_: string, { journeyId: jid }) => {
        return getJourneyWinner(jid).toPromise();
    });

    if (isLoading || !data) {
        return <p>Loading...</p>;
    }
    // TODO: i18n
    return (
        <div>
            <p>{data.sellerName}</p>
            <Carousel imageIds={data.collectedImages} />
        </div>
    );
};

export default JourneyWinner;
