import React from 'react';

import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import BaseSlider, { CustomArrowProps } from 'react-slick';
import { useId } from '@react-aria/utils';
import tw, { styled } from 'twin.macro';
import './slick-theme.css';
import './slick.css';

import Picture from '../Picture';
import useMatchMedia from '../../utils/hooks/useProgressiveImage/useMatchMedia';
import tailwind from '../../../tailwind.config.js';

const Slider = styled(BaseSlider)`
    ${tw`
        w-1/2-screen
        pb-4
  `}
`;

const CustomArrowLeft: React.FC<CustomArrowProps> = (props) => {
    return (
        <div {...props}>
            <GoArrowLeft color={tailwind.theme.colors.black} />
        </div>
    );
};

const CustomArrowRight: React.FC<CustomArrowProps> = (props) => {
    return (
        <div {...props}>
            <GoArrowRight color={tailwind.theme.colors.black} />
        </div>
    );
};

const Carousel: React.FC<{ imageIds: string[] }> = (props) => {
    const { imageIds } = props;
    // Breakpoints as defined in tailwindcss
    const [first] = useMatchMedia('(min-width: 640px)', '(min-width: 768px)', '(min-width: 1024px)', '(min-width: 1280px)');
    return (
        <Slider adaptiveHeight lazyLoad="ondemand" infinite nextArrow={<CustomArrowRight />} prevArrow={<CustomArrowLeft />}>
            {imageIds.map((image) => (
                // @ts-ignore
                <Picture photo={{ id: image }} width={first} key={useId()} />
            ))}
        </Slider>
    );
};

export default Carousel;
