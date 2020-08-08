import { renderHook, act } from '@testing-library/react-hooks';

import { rest, server } from './setup/server';
import { getImageTransformer, expectedBase64 } from './utils/imageHandler';
import { unplashImagesApi } from './setup/server-handlers';
import authorize from './utils/serverUtils';

import useProgressiveImage from '../src/utils/hooks/useProgressiveImage/useProgressiveImage';

const assertImageData = (data: any) => {
    expect(data.alt).toBe('a photo');
    expect(data.author).toBe('auser');
    expect(data.authorProfileUrl).toBe(`${process.env.UNSPLASH_API_URL}/users/auser`);
};

describe('useProgressiveImage testing suite', () => {
    it('should work', () => {
        renderHook(() => useProgressiveImage('aphoto', 250));
    });

    it('should fetch the placeholder', async () => {
        const { result, waitForValueToChange } = renderHook(() => useProgressiveImage('aphoto', 250));
        await act(async () => {
            await waitForValueToChange(() => result.current.placeholderImage);
        });

        expect(result.current.placeholderImage).toBe(expectedBase64());
        assertImageData(result.current);
    });

    it('should return the whole image after it is fetched', async () => {
        server.use(
            rest.get(`${unplashImagesApi}/:id`, (req, res, ctx) => {
                authorize(req, res, ctx);

                if (req.url.searchParams.get('q') && req.url.searchParams.get('q') === '0') {
                    return res(...getImageTransformer(ctx));
                }

                return res(ctx.delay(500), ...getImageTransformer(ctx));
            })
        );

        const { result, waitForValueToChange } = renderHook(() => useProgressiveImage('aphoto', 250));

        await act(async () => {
            await waitForValueToChange(() => result.current.placeholderImage);
        });
        expect(result.current.placeholderImage).toBe(expectedBase64());

        await act(async () => {
            await waitForValueToChange(() => result.current.image);
        });
        expect(result.current.image).toBe(expectedBase64());
        assertImageData(result.current);
    });

    it('should leave image as null if there was a request error', async () => {
        server.use(
            rest.get(`${unplashImagesApi}/:id`, (req, res, ctx) => {
                authorize(req, res, ctx);

                if (req.url.searchParams.get('q') && req.url.searchParams.get('q') === '0') {
                    return res(...getImageTransformer(ctx));
                }

                return res(ctx.status(500));
            })
        );

        const { result, waitForValueToChange } = renderHook(() => useProgressiveImage('aphoto', 250));

        await act(async () => {
            await waitForValueToChange(() => result.current.placeholderImage);
        });
        expect(result.current.placeholderImage).toBe(expectedBase64());

        expect(result.current.image).toBe(null);
        assertImageData(result.current);
    });

    it('should leave placeholder as null if there was a request error', async () => {
        server.use(
            rest.get(`${unplashImagesApi}/:id`, (req, res, ctx) => {
                authorize(req, res, ctx);

                if (req.url.searchParams.get('q') && req.url.searchParams.get('q') === '0') {
                    return res(ctx.status(500));
                }

                return res(...getImageTransformer(ctx));
            })
        );

        const { result, waitForValueToChange } = renderHook(() => useProgressiveImage('aphoto', 250));

        expect(result.current.placeholderImage).toBeNull();

        await act(async () => {
            await waitForValueToChange(() => result.current.image);
        });
        expect(result.current.image).toBe(expectedBase64());
        assertImageData(result.current);
    });
});
