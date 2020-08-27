import React from 'react';
import { useMeter } from '@react-aria/meter';
import tw, { css } from 'twin.macro';

import { IImageSeller } from '~types/models';

const Meter = tw.div`
    w-full
    px-4
`;

// TODO: delete magic constant
const SellerMeter: React.FC<{ seller: IImageSeller }> = (props) => {
    const { seller } = props;

    const { labelProps, meterProps } = useMeter({
        id: seller.id,
        label: seller.sellerName,
        value: seller.points,
        minValue: 0,
        maxValue: 20,
    });
    const percentage = seller.points / 20;
    const barWidth = seller.points >= 20 ? '100%' : `${Math.round(percentage * 100)}%`;

    return (
        <Meter {...meterProps}>
            <span
                css={css`
                    ${tw`text-black text-shadow font-body flex justify-between`}
                `}
                {...labelProps}>
                <p>{seller.sellerName}</p>
                <p>{seller.points} points out of 20.</p>
            </span>
            <div
                css={css`
                    ${tw`h-4 rounded bg-orange-200`}
                `}>
                <div
                    css={css`
                        ${tw`h-4 rounded bg-primary`};
                        width: ${barWidth};
                    `}
                />
            </div>
        </Meter>
    );
};

export default SellerMeter;
