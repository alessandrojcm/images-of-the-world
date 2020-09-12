import React from 'react';
import tw from 'twin.macro';

import { useJourneyState } from '../../context/JourneyStateContext';
import SellerMeter from './SellerMeter';

const Output = tw.output`
    rounded-t
    col-start-2
    col-end-6
    row-start-5
    row-end-finish
    bg-orange-100
    h-full
    flex
    flex-col
    justify-around
    h-full
`;

const JourneyDisplay: React.FC = () => {
    const { sellers } = useJourneyState();

    return (
        <Output>
            {Object.values(sellers ?? {}).map((s) => (
                <SellerMeter key={s.id} seller={s} />
            ))}
        </Output>
    );
};

export default JourneyDisplay;
