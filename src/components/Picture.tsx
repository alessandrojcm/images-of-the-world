import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import useProgressiveImage from '../utils/hooks/useProgressiveImage';

const imageSrc = (src: string | undefined) => css`
    filter: ${!src ? 'blur(20px);' : ''} ${tw`bg-no-repeat bg-cover`};
    transition: all 0.2s ease-out;
`;

const Image = styled.img`
    ${tw`
      rounded-t`}
    ${(props) => imageSrc(props.src)}
`;

const Figure = styled.figure`
    ${tw`rounded-b
      relative
      bg-orange-100
      w-1/2
      bg-opacity-75
      border-orange-100
      border-4
      h-auto`};
`;

const Figcaption = tw.figcaption`
    absolute
    text-black
    text-shadow
    text-right
    pr-4
    bottom-0
    right-0
    select-none
    font-display
    text-lg
`;

const Picture: React.FC<{ photoId: string; width: number; className?: string }> = (props) => {
    const { photoId, width, className = '' } = props;

    const [src, setSrc] = useState<string | null>(null);
    const [alt, setAlt] = useState<string | undefined>(undefined);
    const { placeholderImage, image, alt: desc, authorProfileUrl, author } = useProgressiveImage(photoId, width);

    useEffect(() => {
        if (!image) {
            setSrc(placeholderImage);
        } else {
            setSrc(image);
        }
    }, [placeholderImage, image]);

    useEffect(() => {
        if (!desc) {
            return;
        }
        setAlt(desc);
    }, [desc]);

    return (
        <Figure>
            <Image className={className} src={src || undefined} alt={alt} />
            {authorProfileUrl && author && (
                <Figcaption>
                    <a href={authorProfileUrl} target="_blank" rel="noreferrer">
                        Photo by {author} on Unsplash
                    </a>
                </Figcaption>
            )}
        </Figure>
    );
};

export default Picture;
