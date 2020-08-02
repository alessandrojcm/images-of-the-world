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

    const { data: photoUrl } = useQuery([`image-url-${queryKey}`, { photoId }], getRawUrl, { ...commonQueryOptions });

    useQuery([`placeholder-image-${queryKey}`, { photoUrl }], getPlaceHolderImageAsBase64, {
        ...commonQueryOptions,
        enabled: photoUrl,
        onSuccess: (url: string) => setPlaceholderImage(url),
    });

    useQuery([`image-${queryKey}`, { photoUrl, width }], getHighQualityImageAsBase64, {
        ...commonQueryOptions,
        enabled: photoUrl,
        onSuccess: (url: string) => setImage(url),
    });

    return {
        placeholderImage,
        image,
    };
};

export default useProgressiveImage;
