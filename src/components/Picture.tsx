import React, { useEffect, useState } from 'react';
import tw, { css, styled } from 'twin.macro';

import { useTranslation } from 'react-i18next';
import ContentLoader from 'react-content-loader';
import useProgressiveImage from '../utils/hooks/useProgressiveImage';
import { IPhoto } from '~types/models';
import tailwind from '../../tailwind.config.js';

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
    text-shadow-white
    text-right
    pr-4
    top-0
    right-0
    select-none
    font-display
    text-lg
`;

const Picture: React.FC<{ photo: IPhoto | undefined; width: number; className?: string; onClick?: (photoId: string) => void }> = (props) => {
    const { t } = useTranslation();
    const { photo, width, className = '', onClick = () => {} } = props;

    const { id: photoId } = photo ?? { id: null };

    const [src, setSrc] = useState<string | null>(null);
    const { placeholderImage, image, alt, authorProfileUrl, author, isLoading } = useProgressiveImage(photoId, width, photo);

    useEffect(() => {
        if (!photoId) {
            setSrc(null);
            return;
        }

        if (!image) {
            setSrc(placeholderImage);
        } else {
            setSrc(image);
        }
    }, [placeholderImage, image, photoId, setSrc]);

    return (
        <Figure className={className}>
            {src ? (
                <>
                    <Image className={className} src={src} alt={alt} onClick={() => photoId && onClick(photoId)} />
                    {authorProfileUrl && author && (
                        <Figcaption>
                            <a href={authorProfileUrl} target="_blank" rel="noreferrer">
                                {t('photoCaption', { val: author })}
                            </a>
                        </Figcaption>
                    )}
                </>
            ) : (
                <ContentLoader
                    animate={isLoading}
                    height="39vh"
                    width="100%"
                    foregroundColor={tailwind.theme.colors.orange['100']}
                    backgroundColor={tailwind.theme.colors.orange['200']}
                    backgroundOpacity={0.85}
                    gradientRatio={1}
                    speed={1.5}
                    title={isLoading ? t('loadingImage') : t('selectImage')}>
                    <rect height="50vh" width="100%" />
                </ContentLoader>
            )}
        </Figure>
    );
};

export default Picture;
