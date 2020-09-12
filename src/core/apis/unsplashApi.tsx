import ky from 'ky-universal';
import { from, Observable } from 'rxjs';

import { IPhoto } from '~types/models';
import { IUnplashResponsiveParameters } from '~types/models/IUnplashResponsiveParameters';

const authHeaders = {
    'Accept-Version': 'v1',
    Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
};

const unsplashApi = ky.create({
    prefixUrl: process.env.UNSPLASH_API_URL,
    headers: {
        ...authHeaders,
    },
});

const searchRandomPhoto = (term: string): Observable<IPhoto> =>
    from(
        unsplashApi
            .get('photos/random', {
                // @ts-ignore
                searchParams: {
                    query: term,
                    // The browser caches the response since the 3 sellers
                    // query the same URL, so we add a random param to avoid this
                    sig: Math.random(),
                },
            })
            .json() as Promise<IPhoto>
    );

const getPhoto = (id: string, options: IUnplashResponsiveParameters = {}): Observable<IPhoto> =>
    from(
        unsplashApi
            .get(`photos/${id}`, {
                // @ts-ignore
                searchParams: { ...options },
            })
            .json() as Promise<IPhoto>
    );

const unsplash = {
    searchRandomPhoto,
    getPhoto,
};

export { authHeaders };

export default unsplash;
