import { from, pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import ky from 'ky-universal';

import unsplash, { authHeaders } from '../../../core/apis/unsplashApi';

const readBase64Image = () =>
    pipe(
        switchMap(async (response: Response) => {
            const buffer = await response.arrayBuffer();
            const type = response.headers.get('Content-Type') as string;
            return new Blob([buffer], { type });
        }),
        switchMap((blob) => {
            const base64 = new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                // We need to use function since we need access to the context (this)

                // eslint-disable-next-line func-names
                reader.onload = function () {
                    resolve(this.result as string);
                };
                // eslint-disable-next-line func-names
                reader.onerror = function () {
                    reject(new Error('An error occurred loading the image'));
                };

                reader.readAsDataURL(blob);
            });

            return from(base64);
        }),
        catchError(() => from(Promise.reject()))
    );

const getHighQualityImageAsBase64 = (_: string, { photoUrl, width }: { photoUrl: string; width: number }) => {
    // The URL from unsplash returns some query params needed in order to
    // perform image manipulations. We are extracting them because
    // they will get overwritten
    const params = new URLSearchParams(photoUrl.split('?')[1]);
    params.append('auto', 'format');
    params.append('w', width.toString());

    return from(
        ky.get(photoUrl, {
            searchParams: {
                ...new URLSearchParams(photoUrl),
                auto: 'format',
                width,
            },
            headers: {
                ...authHeaders,
            },
        })
    )
        .pipe(readBase64Image())
        .toPromise();
};

const getPlaceHolderImageAsBase64 = (_: string, { photoUrl }: { photoUrl: string }) => {
    const params = new URLSearchParams(photoUrl.split('?')[1]);
    params.append('q', '0');
    params.append('w', '256');

    return from(
        ky.get(photoUrl, {
            searchParams: params,
            headers: {
                ...authHeaders,
            },
        })
    )
        .pipe(readBase64Image())
        .toPromise();
};

const getRawUrl = (_: string, { photoId }: { photoId: string }) =>
    unsplash
        .getPhoto(photoId)
        .pipe(
            map((photo) => ({
                photoUrl: photo.urls.raw,
                alt: photo.alt_description,
                author: photo.user.name,
                authorProfileUrl: photo.user.links.html,
            })),
            catchError(() => from(Promise.reject()))
        )
        .toPromise();

export { getHighQualityImageAsBase64, getPlaceHolderImageAsBase64, getRawUrl };
