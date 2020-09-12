import { useState } from 'react';

import { useId } from '@react-aria/utils';
import { QueryConfig, useQuery } from 'react-query';

import { getHighQualityImageAsBase64, getPlaceHolderImageAsBase64, getRawUrl } from './imageFetchingUtils';
import { IuseProgressiveImage } from '~types/hooks';
import { IPhoto } from '~types/models';

const commonQueryOptions: QueryConfig<any> = {
    retry: 5,
    retryDelay: (retryAttempt) => retryAttempt * 5,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
};

/**
 * @description This hook with search a photo from unsplash and fetch two photos
 * one with the resolution given and another with reduced resolution to use
 * as a placeholder
 * @param photoId The photoId from unsplash.
 * @param width The width for the full res photo
 * @param initialPhoto In case the photo information has alreday been fetched
 * this will act as the initial cache.
 * @return {IuseProgressiveImage}
 */
const useProgressiveImage = (photoId: string | null, width: number, initialPhoto?: IPhoto): IuseProgressiveImage => {
    const [placeholderImage, setPlaceholderImage] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const queryKey = useId();

    const { data, isLoading: rawLoading } = useQuery([`image-url-${queryKey}`, { photoId: initialPhoto?.id ?? photoId }], getRawUrl, {
        ...commonQueryOptions,
        enabled: photoId,
        ...(initialPhoto &&
            !photoId && {
                initialData: {
                    photoUrl: initialPhoto.urls.raw,
                    alt: initialPhoto.alt_description,
                    author: initialPhoto.user.name,
                    authorProfileUrl: initialPhoto.user.links.html,
                },
            }),
    });

    const { isLoading: placeholderLoading } = useQuery([`placeholder-image-${queryKey}`, { photoUrl: data?.photoUrl ?? null }], getPlaceHolderImageAsBase64, {
        ...commonQueryOptions,
        enabled: data?.photoUrl ?? undefined,
        onSuccess: (url: string) => setPlaceholderImage(url),
    });

    const { isLoading: fullQualityLoading } = useQuery([`image-${queryKey}`, { photoUrl: data?.photoUrl ?? null, width }], getHighQualityImageAsBase64, {
        ...commonQueryOptions,
        enabled: data?.photoUrl ?? undefined,
        onSuccess: (url: string) => setImage(url),
    });

    return {
        placeholderImage,
        image,
        isLoading: [rawLoading, placeholderLoading, fullQualityLoading].some(Boolean),
        ...(data?.alt && { alt: data.alt }),
        ...(data?.author && { author: data.author }),
        ...(data?.authorProfileUrl && { authorProfileUrl: data.authorProfileUrl }),
    };
};

export default useProgressiveImage;
