import { useState } from 'react';

import { useId } from '@react-aria/utils';
import { QueryOptions, useQuery } from 'react-query';

import { getHighQualityImageAsBase64, getPlaceHolderImageAsBase64, getRawUrl } from './imageFetchingUtils';
import { IuseProgressiveImage } from '~types/hooks';

const commonQueryOptions: QueryOptions<any> = {
    retry: 5,
    retryDelay: (retryAttempt) => retryAttempt * 5,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    cacheTime: Infinity,
};

const useProgressiveImage = (photoId: string, width: number): IuseProgressiveImage => {
    const [placeholderImage, setPlaceholderImage] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const queryKey = useId();

    const { data } = useQuery([`image-url-${queryKey}`, { photoId }], getRawUrl, { ...commonQueryOptions });

    useQuery([`placeholder-image-${queryKey}`, { photoUrl: data?.photoUrl ?? null }], getPlaceHolderImageAsBase64, {
        ...commonQueryOptions,
        enabled: data?.photoUrl ?? undefined,
        onSuccess: (url: string) => setPlaceholderImage(url),
        onError: () => setPlaceholderImage(null),
    });

    useQuery([`image-${queryKey}`, { photoUrl: data?.photoUrl ?? null, width }], getHighQualityImageAsBase64, {
        ...commonQueryOptions,
        enabled: data?.photoUrl ?? undefined,
        onSuccess: (url: string) => setImage(url),
        onError: () => setImage(null),
    });

    return {
        placeholderImage,
        image,
        ...(data?.alt && { alt: data.alt }),
        ...(data?.author && { author: data.author }),
        ...(data?.authorProfileUrl && { authorProfileUrl: data.authorProfileUrl }),
    };
};

export default useProgressiveImage;
