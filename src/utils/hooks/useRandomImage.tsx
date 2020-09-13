import { useId } from '@react-aria/utils';
import { QueryConfig, useQuery } from 'react-query';

import { useEffect } from 'react';
import { IPhoto } from '~types/models';
import unplash from '../../core/apis/unsplashApi';

const commonQueryOptions: QueryConfig<any> = {
    retry: 5,
    retryDelay: (retryAttempt) => retryAttempt * 5,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
};

const useRandomImage = (searchTerm: string | null, id?: string, onError?: CallableFunction) => {
    const key = useId(id);

    const { data, isLoading, clear } = useQuery<IPhoto, [string, { query: string | null }]>(
        [key, { query: searchTerm }],
        (_: string, { query }) => unplash.searchRandomPhoto(query as string).toPromise(),
        {
            ...commonQueryOptions,
            enabled: searchTerm,
            onError: (err) => {
                if (onError) {
                    onError(err);
                }
            },
        }
    );

    useEffect(() => {
        if (!searchTerm) {
            clear();
        }
    }, [searchTerm, clear]);

    return { photo: data, isLoading };
};

export default useRandomImage;
