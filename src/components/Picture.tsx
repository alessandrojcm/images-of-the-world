import React, { useEffect, useState } from 'react';
import tw, { css, styled } from 'twin.macro';

import { useTranslation } from 'react-i18next';
import useProgressiveImage from '../utils/hooks/useProgressiveImage';
import { IPhoto } from '~types/models';

const imageSrc = (src: string | undefined) => css`
    filter: ${!src ? 'blur(20px);' : ''} ${tw`bg-no-repeat bg-cover`};
    transition: all 0.2s ease-out;
`;

const Image = styled.img`
    ${tw`
      cursor-pointer
      block
      object-cover
      h-full
      w-full
      rounded-t`}
    ${(props) => imageSrc(props.src)}
`;

const Figure = styled.figure`
    ${tw`
      relative
      bg-orange-100
      border-orange-100
      rounded-t
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

const Picture: React.FC<{ photo: IPhoto | undefined; width: number; className?: string; onClick: (photoId: string) => void }> = (props) => {
    const { t } = useTranslation();
    const { photo, width, className = '', onClick } = props;

    const { id: photoId } = photo ?? { id: null };

    const [src, setSrc] = useState<string | null>(null);
    const [alt, setAlt] = useState<string | undefined>(undefined);
    const { placeholderImage, image, alt: desc, authorProfileUrl, author } = useProgressiveImage(photoId, width, photo);

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
        <Figure className={className}>
            <Image className={className} src={src || undefined} alt={alt} onClick={() => photoId && onClick(photoId)} />
            {authorProfileUrl && author && (
                <Figcaption>
                    <a href={authorProfileUrl} target="_blank" rel="noreferrer">
                        {t('photoCaption', { val: author })}
                    </a>
                </Figcaption>
            )}
        </Figure>
    );
};

export default Picture;
