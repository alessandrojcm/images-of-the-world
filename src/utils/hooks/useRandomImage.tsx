import { useId } from '@react-aria/utils';
import { QueryOptions, useQuery } from 'react-query';

import unplash from '../../core/apis/unsplashApi';
import { IPhoto } from '~types/models';

const commonQueryOptions: QueryOptions<any> = {
    retry: 5,
    retryDelay: (retryAttempt) => retryAttempt * 5,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
};

const useRandomImage = (searchTerm: string | null) => {
    const key = useId();

    const { data, isLoading } = useQuery<IPhoto, [string, { query: string | null }]>([key, { query: searchTerm }], (_: string, { query }) => unplash.searchRandomPhoto(query as string).toPromise(), {
        ...commonQueryOptions,
        enabled: searchTerm,
    });

    return { photo: data, isLoading };
};

export default useRandomImage;
