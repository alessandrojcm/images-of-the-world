import { rest } from 'msw';

import { getImageTransformer } from '../utils/imageHandler';
import authorize from '../utils/serverUtils';
import loadLocale from '../utils/localesHandler';
import { IImageSeller } from '../../src/types/models';

const unsplashApi = process.env.UNSPLASH_API_URL;
export const unplashImagesApi = 'https://images.unplash.com';

const sellers: IImageSeller[] = Array.from({ length: 3 }).map((_, i) => ({
    id: i.toString(),
    sellerName: `${i}`,
    points: 0,
    collectedPhotos: [],
}));

const returnImage = () => {
    return {
        alt_description: 'a photo',
        user: {
            name: 'auser',
            links: {
                html: `${unsplashApi}/users/auser`,
            },
        },
        urls: {
            raw: `${unplashImagesApi}/a-photo-mock-id`,
        },
    };
};

export default [
    rest.get('*/locales/:lng', async (req, res, ctx) => {
        const locale = await loadLocale(req.params.lng);

        return res(ctx.json(locale));
    }),
    rest.get('*/sellers', (req, res, ctx) => {
        return res(ctx.json(sellers));
    }),
    rest.get(`${unsplashApi}/photos/:id`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = returnImage();
        return res(ctx.json(response));
    }),
    rest.get(`${unsplashApi}/photos/random`, (req, res, ctx) => {
        authorize(req, res, ctx);
        const response = returnImage();
        return res(ctx.json(response));
    }),
    rest.get(`${unplashImagesApi}/:id`, async (req, res, ctx) => {
        authorize(req, res, ctx);

        return res(...getImageTransformer(ctx));
    }),
];
