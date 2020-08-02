import ky from 'ky-universal';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

const searchRandomPhoto = (term: string, count = 1, options: IUnplashResponsiveParameters = {}) =>
    from(
        unsplashApi
            .get('photos/random', {
                // @ts-ignore
                searchParams: {
                    query: term,
                    count,
                    ...options,
                },
            })
            .then((t) => t.json())
    ).pipe(
        map((photos: IPhoto[]) => {
            return photos.map((photo: IPhoto) => ({
                id: photo.id,
                alt: photo.alt_description,
                name: photo.description,
                url: photo.urls.raw,
            }));
        })
    );

const getPhoto = (id: string, options: IUnplashResponsiveParameters = {}): Observable<IPhoto> =>
    from(
        unsplashApi
            .get(`photos/${id}`, {
                // @ts-ignore
                searchParams: { ...options },
            })
            // @ts-ignore
            .then((t) => t.json() as IPhoto)
    );

const unsplash = {
    searchRandomPhoto,
    getPhoto,
};

export { authHeaders };

export default unsplash;
