import ky from 'ky';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as process from 'process';
import { IPhoto } from '~types/models';
import { IUnplashResponsiveParameters } from '~types/models/IUnplashResponsiveParameters';

const unsplashApi = ky.create({
    prefixUrl: process.env.UNSPLASH_API,
    headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`,
    },
});

const searchRandomPhoto = (term: string, count = 1, options: IUnplashResponsiveParameters = {}) =>
    from(
        unsplashApi.get('/photos/random', {
            // @ts-ignore
            searchParams: {
                query: term,
                count,
                ...options,
            },
        })
    ).pipe(
        switchMap((response) => from(response.json())),
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
        ky.get(`/photos/${id}`, {
            // @ts-ignore
            searchParams: { ...options },
        })
    ).pipe(switchMap((response) => from(response.json())));

const unsplash = {
    searchRandomPhoto,
    getPhoto,
};

export default unsplash;
