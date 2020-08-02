import React, { useEffect, useState } from 'react';
import tw, { css, styled } from 'twin.macro';

import { IBackgroundImageProps } from '../types/props';
import useProgressiveImage from '../utils/hooks/useProgressiveImage';

const backgroundImage = (imageUrl: string, imageLoaded: boolean = false) => css`
    background-image: url(${imageUrl});
    filter: ${!imageLoaded ? 'blur(20px);' : ''} ${tw`bg-no-repeat bg-cover`};
    transition: all 0.2s ease-out;
`;

const Background = styled.div`
    ${tw`absolute top-0 left-0 w-screen h-screen`}
    ${(props: { imageUrl: string | null; imageLoaded: boolean }) => (props.imageUrl ? backgroundImage(props.imageUrl, props.imageLoaded) : tw`bg-primary`)}
`;

const BackgroundImage: React.FC<IBackgroundImageProps> = (props) => {
    const { photoId, width } = props;

    const [backgroundImageSrc, setBackgroundImageSrc] = useState<string | null>(null);
    const { placeholderImage, image } = useProgressiveImage(photoId, width);

    useEffect(() => {
        if (!image) {
        } else {
            setBackgroundImageSrc(image);
        }
    }, [placeholderImage, image]);

    return <Background imageUrl={backgroundImageSrc} imageLoaded={Boolean(image)} />;
};

export default BackgroundImage;
